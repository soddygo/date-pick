define('purchase/pages/purchaseCreate/purchaseCreate', function (require, exports, module) {
    /*cabin插件工具*/

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    MINIPOP = require('cabin/widgets/minipop/minipop');
    require('cabin/tools/fromValidate');
    // var VeeValidate  = require('../plugins/vee-validate.minimal.js');//表单验证插件

    var ajax = require('purchase/common/data/ajax');


    var handle, _fn, page;
    page = Page({
        nodeClass: 'purchase-pages-purchaseCreate',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/purchaseCreate/purchaseCreate.css', 'purchase/pages/purchaseCreate/purchaseCreate.tpl'],
        cabinVue: {
            //这里this 指向当前VUE 实例,仅支持es5语法！！已经默认添加了timepicker 指令
            //使用vue时　不要使用handle.jView 统一使用$ 筛选或者使用$(this.$el).find(xxx)去实现；this.$el为vue实例dom 节点
            //使用vue 后可以不使用page 的show hide 方法,建议使用vue 自己的 mounted 取代show方法 destroy 取代hide 方法
            el: '#purchase-pages-purchaseCreate',
            //这里必须 使用一个方法返回给data
            data: function () {
                //订单类型枚举
                var orderClass = [
                    {key: "P01", value: "供应商采购订单"},
                    {key: "P02", value: "配送采购订单"},
                    {key: "P03", value: "供应商采购退单"},
                    {key: "P04", value: "配送采购退单"},
                    // {key: "P05", value: "门店间调拨单"},
                    // {key: "P06", value: "大宗采购订单"},
                ];
                //订单状态
                var orderStatus = [
                    {key: 0, value: "无状态"},
                    {key: 1, value: "已保存"},
                    {key: 2, value: "已审核"},
                    {key: 3, value: "已完成"},
                    {key: 4, value: "已关闭"},
                ];
                //当前页面是否可以修改等标记
                var flagCollect = {
                    operationFlag: 1,//1:查看; 2:修改
                    hasSaveFlag: 2,//1:已经保存;2:存在未保存数据
                };
                //行数据信息
                //TODO 初始化数据,后面要修改,这里是便于测试用
                var orderData = {
                    orderId: _fn.guid(),
                    orderClass: "P01",
                    orderStatusCode: 0,
                    supplierBh: "11111",// '供应商编号',
                    supplierName: "test测试",//'供应商名称',
                    orderGoodsAddress: "test",//'订货地点',
                    orderGoodsDate: "",// '订货日期',
                    urgenFlag: false,//'加急订单标记',
                    predictDate: "",// '预计到货日期',

                };
                //订单下面的,商品明细
                var rowData = [];
                //供应商搜索用
                var supplySearch=[
                    {key: 0, value: "test"},
                ];
                var supplySearchOptions={
                    no_results_text: '没有找到',
                    search_contains: true, //关键字模糊搜索，设置为false，则只从开头开始匹配
                    max_selected_options: 1, //当select为多选时，最多选择个数
                    width: "300px",
                };


                return {
                    orderData: orderData,
                    rowData: rowData,
                    flagCollect: flagCollect,
                    orderClass: orderClass,
                    orderStatus: orderStatus,
                    supplySearch: supplySearch,
                    supplySearchOptions: supplySearchOptions,
                }
            },
            mounted: function () {
                // this.use(VeeValidate);//加载表单验证插件

                var orderData = this.orderData;
                //进入页面
                //cabinVue 里面所有的this 都指向当前这个vue 实例
                //vue 更多使用方法请查看vue官方文档
                this.$nextTick(function () {
                    //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

                });

                //获取入参
                var params = kayak.router.requestParam;
                this.orderData.orderClass = params.orderClass;

                //预计到货日期初始化
                $('#predict_date_id').PdDatePicker({
                    startView: 2,
                    minView: 3,
                    initDate: moment().format('YYYY-MM-DD'),
                    format: 'YYYY-MM-DD',
                    //containerId: 'abc'
                }).on('change', function (evt, data) {
                    var date = moment(data).format('YYYY-MM-DD');
                    orderData.predictDate = date;
                });

                //初始化新增订单信息
                orderData['orderGoodsDate'] = moment().format('YYYY-MM-DD');//订货日期,默认当前日期,不可修改

                // rowData 末尾空行
                this.rowData.push({goodsSerialNumber: "", orderNumber: 0});

                var checkedFlag = this.$options.methods.checkedSaveInfo.bind(this)();

            },
            //如果 不需要保存页面状态必须添加下面这个方法
            beforeDestroy: function () {
                Object.assign(this.$data, this.$options.data());
            },
            destroyed: function () {
                //离开页面方法
            },
            methods: {
                //自定义方法
                initEvt: function () {
                    console.log('mounted')
                },
                //新增采购订单,或者采购退单
                createOrder: function (event) {
                    var url = '#full/purchase/purchaseCreate:classSelected=' + this.rowData.classSelected;
                    if (this.flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否继续新增订单?", url)
                    } else {
                        //跳转到新增采购订单界面,订单类型,以当前页面中选择的订单类型为准
                        kayak.router.go(url)
                    }
                },
                //保存订单修改
                save: function (event) {
                    this.flagCollect.hasSaveFlag = 1
                    //todo
                    //1. 订单基本信息
                    var orderData = this.orderData;
                    var rowData = this.rowData;
                    var orderClass = this.orderData.orderClass;

                    var clearPageData = this.$options.methods.clearPageData.bind(this);

                    //校验
                    /**
                     * es6语法promise不能使用,只能使用丑陋的es5嵌套语法,无力吐槽
                     */
                    var domTarget = this.$el;
                    $(domTarget).find('#J_valid_order').one('valid.dm.validate', function (data) {
                        console.log(data.isValid) //true/false
                        if (data.isValid) {
                            //在校验table表单
                            $(domTarget).find('#J_valid_table').one('valid.dm.validate', function (data) {
                                console.log("J_valid_table:" + data.isValid) //true/false
                                //这里进行表单提交后端
                                if (data.isValid) {

                                    var tempRowData = [];
                                    //最后一行用于新增的空白行,不要
                                    for (var i = 0, j = rowData.length; i < j; i++) {
                                        var temp = $.extend(rowData[i], orderData);//继承基本属性
                                        if (i < j - 1) {
                                            tempRowData.push(temp)
                                        } else if (temp.goodsSerialNumber && temp.goodsSerialNumber !== "") {
                                            tempRowData.push(temp)
                                        }
                                    }
                                    //参数汇总
                                    var requestParams = {
                                        orderData: orderData,
                                        rowData: tempRowData,
                                        orderType: orderClass
                                    };
                                    var requestJson = JSON.stringify(requestParams);
                                    cabin.widgets.loading.show();

                                    //请求后台,保存订单信息
                                    ajax.post(ajax.insertOrder, requestJson, function (res) {
                                        cabin.widgets.loading.hide();
                                        if (res.code === "0000") {
                                            //保存成功
                                            MINIPOP.show({
                                                title: '提示',
                                                msg: '保存成功',
                                                cancel: '确认'
                                            });
                                            // 清理当前页面数据 方便重新添加数据 clearPageData
                                            clearPageData();
                                        } else {
                                            //失败
                                            MINIPOP.show({
                                                title: '提示',
                                                msg: '保存失败',
                                                cancel: '确认'
                                            });
                                        }
                                    }, "application/json;charset=UTF-8");

                                }
                            }).validator('submitValid');//table pop 单个tr验证要设置作用域validator('submitValid'，this);
                        }
                    }).validator('submitValid');


                },
                checkedSaveInfo: function (event) {
                    //校验订单信息保存
                    <!--表单-->
                    $(this.$el).find('#J_valid_order').validator({
                        type: '', data: [
                            {validType: 'valid_supplier_bh', valid: 'isNonEmpty||minLength:6', errorMsg: '不能为空'},
                            {validType: 'valid_predict_date', valid: 'isNonEmpty', errorMsg: '不能为空'},
                            // {validType:'test3',valid:'isNonEmpty||onlyNum',errorMsg:'不能为空||只能输入数值'},
                            // {validType:'test4',valid:'greaterThanEqual:test5/test4',errorMsg:'开始时间必须小于截止时间'},
                            // {validType:'test5',valid:'greaterThanEqual:test5/test4',errorMsg:'截止时间必须大于开始时间'},
                            // {validType:'test6',valid:'isNonEmpty||onlyNum',errorMsg:'不能为空||只能输入数值'},
                            // {validType:'test7',valid:'isNonEmpty',errorMsg:'不能为空'},
                            // {validType:'test8',valid:'between:3-10',errorMsg:'请输入正确的字符长度范围'},
                            // {validType:'test9',valid:'isNonEmpty',errorMsg:'不能为空'},
                        ]
                    });
                    <!--表格表单-->
                    $(this.$el).find('#J_valid_table').validator({
                        type: 'pop', data: [
                            {validType: 'goods_serial_number', valid: 'isNonEmpty', errorMsg: '不能为空'},
                            {
                                validType: 'order_number',
                                valid: 'isNonEmpty||isDecimal:2',
                                errorMsg: '不能为空||只能输入数值且保留两位小数'
                            },
                        ]
                    });


                },
                //返回操作
                reback: function (event) {
                    var url = '#full/purchase/purchaseMain:orderClass=' + this.rowData.orderClass;
                    if (this.flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否放弃并返回?", url);
                    } else {
                        kayak.router.go(url);
                    }
                },
                //增加新的空白行
                addRow: function (event) {
                    //判断是否已有最后一行空白行
                    var temp = this.rowData[this.rowData.length - 1];
                    if (temp && (typeof temp.goodsSerialNumber !== "undefined") && temp.goodsSerialNumber.length === 0) {
                        //不需要增加新的空白,已有一个空白行了
                    } else {
                        this.rowData.push({goodsSerialNumber: "", orderNumber: 0});//添加空白数据
                    }
                },
                deleteRow: function (event, index) {
                    if (this.rowData.length === 1) {
                        //最小必须有一行明细数据,不能再少了
                        MINIPOP.show({
                            title: '消息',
                            msg: '至少必须有一行明细数据,不能再少了',
                            cancel: '我知道了'
                        });
                    } else if (this.rowData.length === index + 1) {
                        //不允许删最后一行,因为最后一行是新增编辑用的
                        MINIPOP.show({
                            title: '消息',
                            msg: '不允许删最后一行空白行,因为最后一行是新增编辑用的',
                            cancel: '我知道了'
                        });
                    } else {
                        //删除明细操作
                        this.rowData.splice(index, 1);
                    }
                },
                //清理当前页面数据,用于重新添加订单
                clearPageData: function () {

                    this.orderData.orderId = _fn.guid();
                    // this.orderData.orderClass = this.orderData.orderClass;
                    this.orderData.orderStatusCode = 0;
                    this.orderData.supplierBh = "";
                    this.orderData.supplierName = "";
                    // this.orderData.orderGoodsAddress = "";
                    this.orderData.orderGoodsDate = moment().format('YYYY-MM-DD');
                    this.orderData.predictDate = "";
                    this.orderData.urgenFlag = false;

                    this.rowData.splice(0, this.rowData.length);//清空数据
                    // rowData 末尾空行,用于添加数据用
                    this.rowData.push({goodsSerialNumber: "", orderNumber: 0});


                    this.flagCollect.hasSaveFlag = 2;//修改标记,有未保存数据

                },
                supplySearch:function (event) {
                    //todo 请求后台获取供应商信息
                    console.log("supplySearch");
                }
            },
            computed: {
                //1:采购订单显示;2:采购退单显示
                orderTableFlag: function () {
                    //采购订单,和采购退单的table列表切换
                    //        orderTableFlag: 1,//1:采购订单显示;2:采购退单显示
                    if (this.orderData.orderClass === "P01") {
                        return 1;
                    } else if (this.orderData.orderClass === "P02") {
                        return 1;
                    } else if (this.orderData.orderClass === "P03") {
                        return 2;
                    } else if (this.orderData.orderClass === "P04") {
                        return 2;
                    } else if (this.orderData.orderClass === "P05") {
                        //第一期无此业务
                        return 0;
                    } else if (this.orderData.orderClass === "P06") {
                        //走其他系统处理,不走此系统
                        return 0;
                    } else {
                        //实际生产,不应该走到这个逻辑,这里是本地测试才会用到的条件分支
                        return 1;
                    }
                }
            },
            watch: {
                "rowData": function (newQuestion, oldQuestion) {
                    // var checkedFlag =  this.$options.methods.checkedSaveInfo.bind(this)();
                    console.log("rowData 触发了watch")

                }
            }
        }
    });
    handle = {};
    _fn = {
        //存在未修改数据,离开当前页面信息提示
        exitCurrentPage: function (msg, url) {
            MINIPOP.show({
                title: '警告',
                msg: msg,
                ok: '确认',
                cancel: '取消',
                sort: 'right', //left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
                callback: function (el, type) {
                    if (type === 'ok') {
                        kayak.router.go(url)
                    } else if (type === 'cancel') {
                        //无操作,停留当前界面
                    }
                }
            });
        },
        guid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            // return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4());
        }
    };
    return page;
});
