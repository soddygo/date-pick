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
                    order_id:_fn.guid(),
                    classSelected: "P01",
                    statusSelected: 0,
                    supplier_bh: "11111",// '供应商编号',
                    supplier_name: "test测试",//'供应商名称',
                    order_goods_address: "test",//'订货地点',
                    order_goods_date: "",// '订货日期',
                    urgen_flag: false,//'加急订单标记',
                    predict_date: "",// '预计到货日期',

                };
                //订单下面的,商品明细
                var rowData = [];
                //商品明细-采购订单
                var defaultRowDataInfo = {
                    goods_serial_number: "",//    '商品编号',
                    goods_name: "",//    '商品名称',
                    order_pack: "",//    '订货包装',
                    order_number: 0,//     '订货数量',
                    repertory_unit: "",//    '库存单位',
                    repertory_number: "",//     '库存单位数量',
                    gift: false,//    '赠品',
                    tax_rate: "",//    '税率',
                    tax_included_pay: "",//    '含税进价',
                    tax_included_amount: "",//    '含税金额',
                    goods_bar_code: "",//    '商品条码',
                    allow_excess: false,//    '允许超收标记',
                    excess_ratio: "",//   '超收比例',
                };
                //商品明细-采购退单
                var defaultRowDataCancelInfo = {
                    goods_serial_number: "",// comment '商品编号',
                    goods_name: "",// comment '商品名称',
                    order_pack: "",// comment '订货包装',
                    order_number: 0,// comment '订货数量',
                    repertory_unit: "",// comment '库存单位',
                    repertory_number: "",// comment '库存单位数量',
                    gift: "",// comment '赠品',
                    tax_rate: "",// comment '税率',
                    tax_included_pay: "",// comment '含税进价',
                    tax_included_amount: "",// comment '含税退货金额',
                    cancel_reason_code: "",// comment '退货原因代码',
                    cancel_reason: "",// comment '退货原因',
                };

                //表单验证控制
                var formFlag = {
                    supplier_bh_flag: false,//供应商
                    rowData_error_flag: [],//商品明细错误索引
                    goods_serial_number_flag: false,//商品编号
                    order_number_flag: false,//商品订货数量
                };

                return {
                    orderData: orderData,
                    rowData: rowData,
                    flagCollect: flagCollect,
                    orderClass: orderClass,
                    orderStatus: orderStatus,
                    defaultRowDataInfo: defaultRowDataInfo,
                    defaultRowDataCancelInfo: defaultRowDataCancelInfo,
                    formFlag: formFlag,
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
                console.log("params:" + JSON.stringify(params));
                this.orderData.classSelected = params.classSelected;

                //预计到货日期初始化
                $('#predict_date_id').PdDatePicker({
                    startView: 2,
                    minView: 3,
                    initDate: moment().format('YYYY-MM-DD'),
                    format: 'YYYY-MM-DD',
                    //containerId: 'abc'
                }).on('change', function (evt, data) {
                    var date = moment(data).format('YYYY-MM-DD');
                    orderData.predict_date = date;
                });

                //初始化新增订单信息
                orderData['order_goods_date'] = moment().format('YYYY-MM-DD');//订货日期,默认当前日期,不可修改

                //分页初始化
                $('#page').NextPage({
                    pageSize: 30, //每页大小,
                    currentPage: 1, //当前页
                    totalCount: 200, //总条数
                    pageRange: 9, //间隔多少个
                    select: [30, 60, 100], //下拉选项
                    showTotal: false,//显示总条数 boolean
                    position: "right", //位置 left right center
                    callback: function (data) {
                    }
                });

                //商品明细,添加测试数据
                var temp1 = {
                    goods_serial_number: "商品编号1",//    '商品编号',
                    goods_name: "商品名称1111",//    '商品名称',
                    order_pack: "订购包装1",//    '订货包装',
                    order_number: 12.01,//     '订货数量',
                    repertory_unit: "KG",//    '库存单位',
                    repertory_number: "11",//     '库存单位数量',
                    gift: false,//    '赠品',
                    tax_rate: "10.78%",//    '税率',
                    tax_included_pay: "222",//    '含税进价',
                    tax_included_amount: "11",//    '含税金额',
                    goods_bar_code: "112",//    '商品条码',
                    allow_excess: false,//    '允许超收标记',
                    excess_ratio: "10%",//   '超收比例',
                };
                var temp2 = {
                    goods_serial_number: "商品编号2",//    '商品编号',
                    goods_name: "商品名称1111",//    '商品名称',
                    order_pack: "订购包装1",//    '订货包装',
                    order_number: 12.01,//     '订货数量',
                    repertory_unit: "KG",//    '库存单位',
                    repertory_number: "22",//     '库存单位数量',
                    gift: false,//    '赠品',
                    tax_rate: "10.34%",//    '税率',
                    tax_included_pay: "123",//    '含税进价',
                    tax_included_amount: "1123",//    '含税金额',
                    goods_bar_code: "111",//    '商品条码',
                    allow_excess: false,//    '允许超收标记',
                    excess_ratio: "",//   '超收比例',
                }
                this.rowData.push(temp1);
                this.rowData.push(temp2);
                // rowData 末尾空表航
                this.rowData.push({goods_serial_number: "", order_number: 0});

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
                    var orderData = _fn.convertParams(this.orderData);
                    var _rowData = {};
                    var rowData = this.rowData;
                    var classSelected = this.orderData.classSelected;

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

                                    if ("P01" === classSelected || "P02" === classSelected) {
                                        _rowData = _fn.covertGoodsParams(rowData);

                                    } else if ("P03" === classSelected || "P04" === classSelected) {
                                        _rowData = _fn.convertGoodsCancelParams(rowData);

                                    } else {
                                        console.error("订单类型错误!")
                                    }

                                    for (var i = 0; i < _rowData.length; i++) {
                                        _rowData[i] = $.extend(_rowData[i], orderData);//继承基本属性
                                    }


                                    //参数汇总
                                    var requestParams = {
                                        orderData: orderData,
                                        rowData: _rowData,
                                        orderType: classSelected
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
                            {validType: 'order_number', valid: 'isNonEmpty||isDecimal:2', errorMsg: '不能为空||只能输入数值且保留两位小数'},
                        ]
                    });


                },
                //返回操作
                reback: function (event) {
                    var url = '#full/purchase/purchaseMain:classSelected=' + this.rowData.classSelected;
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
                    if (temp && (typeof temp.goods_serial_number !== "undefined") && temp.goods_serial_number.length === 0) {
                        //不需要增加新的空白,已有一个空白行了
                    } else {
                        this.rowData.push({goods_serial_number: "", order_number: 0});//添加空白数据

                        // //判断当前是订单,还退单
                        // if (this.orderData.classSelected === "P01" || this.orderData.classSelected === "P02") {
                        //     //订单
                        //     var blankObj = $.extend({}, this.defaultRowDataInfo);
                        //     this. rowData.push(blankObj)
                        // } else if (this.orderData.classSelected === "P03" || this.orderData.classSelected === "P04") {
                        //     //退单
                        //     var blankObj = $.extend({}, this.defaultRowDataCancelInfo);
                        //     this.rowData.push(blankObj)
                        // } else {
                        //     this. rowData.push({goods_serial_number: "", order_number: 0});//添加空白数据
                        // }
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
                initPageWidget: function (totalCount, url) {
                    var page = this.page;
                    var order = this.order;
                    var orderRow = this.orderRow;

                    page.totalCount = totalCount;

                    //分页初始化
                    $('#page').NextPage({
                        pageSize: page.pageSize, //每页大小,
                        currentPage: page.currentPage, //当前页
                        totalCount: totalCount, //总条数
                        pageRange: 9, //间隔多少个
                        select: [30, 60, 100], //下拉选项
                        showTotal: true,//显示总条数 boolean
                        position: "right", //位置 left right center
                        callback: function (data, isNextPage) {
                            page.currentPage = data.currentPage;
                            page.pageSize = data.pageSize;

                            var purchaseOrderMain = _fn.convertParams(order, page.currentPage, page.pageSize);
                            cabin.widgets.loading.show();
                            orderRow.splice(0, orderRow.length);//清空数据

                            //请求后台数据
                            ajax.post(url, purchaseOrderMain, function (res) {
                                for (var key in res.data.result) {
                                    orderRow.push(res.data.result[key]);
                                }
                                cabin.widgets.loading.hide();
                            });
                        }
                    });
                }
            },
            computed: {
                //1:采购订单显示;2:采购退单显示
                orderTableFlag: function () {
                    //采购订单,和采购退单的table列表切换
                    //        orderTableFlag: 1,//1:采购订单显示;2:采购退单显示
                    if (this.orderData.classSelected === "P01") {
                        return 1;
                    } else if (this.orderData.classSelected === "P02") {
                        return 1;
                    } else if (this.orderData.classSelected === "P03") {
                        return 2;
                    } else if (this.orderData.classSelected === "P04") {
                        return 2;
                    } else if (this.orderData.classSelected === "P05") {
                        //第一期无此业务
                        return 0;
                    } else if (this.orderData.classSelected === "P06") {
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
        //订单基本信息转换
        convertParams: function (order, pageNo, pageSize) {
            //转译字段名称,订单基本信息
            var purchaseOrderMain = {
                orderId: order.order_id,
                orderStatusCode: order.statusSelected,
                supplierBh: order.supplier_bh,
                orderGoodsAddress: order.order_goods_address,
                orderGoodsDate: order.order_goods_date,
                predictDate: order.predict_date,
                urgenFlag: order.urgen_flag === false ? 0 : 1,
                orderClass:order.classSelected,

                pageNo: pageNo,
                pageSize: pageSize,

            };
            return purchaseOrderMain;
        },
        covertGoodsParams: function (rowData) {

            var result = [];
            for (var i = 0, j = rowData.length; i < j; i++) {
                //采购订单,字段转换
                var purchaseOrder = {
                    goodsSerialNumber: rowData.goods_serial_number,
                    goodsName: rowData.goods_name,
                    orderPack: rowData.order_pack,
                    orderNumber: rowData.order_number,
                    repertoryUnit: rowData.repertory_unit,
                    repertoryNumber: rowData.repertory_number,
                    gift: rowData.gift,
                    taxRate: rowData.tax_rate,
                    taxIncludedPay: rowData.tax_included_pay,
                    taxIncludedAmount: rowData.tax_included_amount,
                    goodsBarCode: rowData.goods_bar_code,
                    allowExcess: rowData.allow_excess,
                    excessRatio: rowData.excess_ratio,

                }
                result.push(purchaseOrder);
            }

            return result;

        },
        convertGoodsCancelParams: function (rowData) {
            var result = [];
            for (var i = 0, j = rowData.length; i < j; i++) {
                //采购退单,字段转换
                var purchaseOrderCancel = {
                    goodsSerialNumber: rowData.goods_serial_number,
                    goodsName: rowData.goods_name,
                    orderPack: rowData.order_pack,
                    orderNumber: rowData.order_number,
                    repertoryUnit: rowData.repertory_unit,
                    repertoryNumber: rowData.repertory_number,
                    taxRate: rowData.tax_rate,
                    taxIncludedPay: rowData.tax_included_pay,
                    taxIncludedAmount: rowData.tax_included_amount,
                    cancelReasonCode: rowData.cancel_reason,
                };
                result.push(purchaseOrderCancel);
            }


            return result;

        },
        guid:function (){
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            // return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4());
        }
    };
    return page;
});
