define('purchase/pages/purchaseView/purchaseView', function (require, exports, module) {
    /*cabin插件工具*/

    MINIPOP = require('cabin/widgets/minipop/minipop');

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    var handle, _fn, page;
    page = Page({
        nodeClass: 'purchase-pages-purchaseView',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/purchaseView/purchaseView.css', 'purchase/pages/purchaseView/purchaseView.tpl'],
        pageTitle: '订单详情',//当前页面需要展示的title
        cabinVue: {
            //这里this 指向当前VUE 实例,仅支持es5语法！！已经默认添加了timepicker 指令
            //使用vue时　不要使用handle.jView 统一使用$ 筛选或者使用$(this.$el).find(xxx)去实现；this.$el为vue实例dom 节点
            //使用vue 后可以不使用page 的show hide 方法,建议使用vue 自己的 mounted 取代show方法 destroy 取代hide 方法
            el: '#purchase-pages-purchaseView',
            //这里必须 使用一个方法返回给data
            data: function () {
                //订单类型枚举
                var orderClass = [
                    {key: "all", value: "全部"},
                    {key: "P01", value: "供应商采购订单"},
                    {key: "P02", value: "配送采购订单"},
                    {key: "P03", value: "供应商采购退单"},
                    {key: "P04", value: "配送采购退单"},
                    // {key: "P05", value: "门店间调拨单"},
                    // {key: "P06", value: "大宗采购订单"},
                ];
                //订单状态
                var orderStatus = [
                    {key: "all", value: "全部"},
                    {key: "save", value: "已保存"},
                    {key: "audit", value: "已审核"},
                    {key: "complete", value: "已完成"},
                    {key: "close", value: "已关闭"},
                ];
                //当前页面是否可以修改等标记
                var flagCollect = {
                    operationFlag: 1,//1:查看; 2:修改
                    hasSaveFlag: 1,//1:已经保存;2:存在未保存数据
                    // orderTableFlag: 1,//1:采购订单显示;2:采购退单显示
                };
                //行数据信息
                //TODO 初始化数据,后面要修改,这里是便于测试用
                var orderData = {
                    classSelected: "P01",
                    statusSelected: "save",//"订单状态"

                    order_class: "",//'订单类型',
                    order_class_name: "",//ent '订单类型中文名称',
                    order_id: "1111",//ent '订单编号，编号生成逻辑： PO+年月日+店号+流水号4位',
                    erp_serial_number: "",// 'ERP编号',

                    supplier_bh: "11111",// '供应商编号',
                    supplier_name: "test测试",//'供应商名称',
                    order_goods_address: "test",//'订货地点',
                    order_goods_date: "",// '订货日期',
                    urgen_flag: false,//'加急订单标记',
                    predict_date: "",// '预计到货日期',


                };
                //订单下面的,商品明细
                var rowData = [];//新增的商品明细
                var originRowData = [];//原本的商品明细,不允许删除,只能修改商品编号和数量

                return {
                    rowData: rowData,
                    orderData: orderData,
                    flagCollect: flagCollect,
                    orderClass: orderClass,
                    orderStatus: orderStatus,
                }
            },
            mounted: function () {
                //进入页面
                //cabinVue 里面所有的this 都指向当前这个vue 实例
                //vue 更多使用方法请查看vue官方文档
                this.$nextTick(function () {
                    //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

                });

                //获取入参
                var params = kayak.router.requestParam;
                // flagCollect.operationFlag = params.operationFlag;//当前页面查看标记,只读,还是编辑模式
                console.log("params:" + JSON.stringify(params));
                this.orderData.classSelected = params.classSelected;
                this.orderData.statusSelected = params.statusSelected;
                this.orderData.order_id = params.orderId;
                //todo ajax根据订单id请求后台明细数据

                //init datePick
                //current date
                var currentDateStr = moment().format('YYYY-MM-DD');
                console.log("currentDateStr:" + currentDateStr);

                //分页初始化
                $('#page').NextPage({
                    pageSize: 30, //每页大小,
                    currentPage: 1, //当前页
                    totalCount: 200, //总条数
                    pageRange: 9, //间隔多少个
                    select: [30, 60, 100], //下拉选项
                    showTotal: false,//显示总条数 boolean
                    position: null, //位置 left right center
                    callback: function (data) {
                        //todo
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
                // // rowData 末尾空表航
                // rowData.push({goods_serial_number: "", order_number: 0});

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
                //编辑
                updateOperationFlag: function (flag) {
                    this.flagCollect.operationFlag = flag;
                    this.flagCollect.hasSaveFlag = 2;
                    //判断是否已有最后一行空白行
                    var temp = this.rowData[this.rowData.length - 1];
                    if (temp && (typeof temp.goods_serial_number !== "undefined") && temp.goods_serial_number.length === 0) {
                        //不需要增加新的空白,已有一个空白行了
                    } else {
                        this.rowData.push({goods_serial_number: "", order_number: 0});//添加空白数据
                    }
                },
                //新增采购订单,或者采购退单
                createOrder: function (event) {
                    var url = '#full/purchase/purchaseCreate:classSelected=' + this.orderData.classSelected;
                    if (this.flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否继续新增订单?", url);
                    } else {
                        //跳转到新增采购订单界面,订单类型,以当前页面中选择的订单类型为准
                        kayak.router.go(url);
                    }
                },
                //保存订单修改
                save: function (event) {
                    //todo
                },
                //返回操作
                reback: function (event) {
                    if (this.flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否放弃并返回?", "#full/purchase/purchaseMain:classSelected=all")
                    } else {
                        kayak.router.go('#full/purchase/purchaseMain:classSelected=' + this.orderData.classSelected);
                    }
                },
                audit: function (event) {
                    //TODO
                },
                //增加新的空白行
                addRow: function (event) {
                    //判断是否已有最后一行空白行
                    var temp = this.rowData[this.rowData.length - 1];
                    if (temp && (typeof temp.goods_serial_number !== "undefined") && temp.goods_serial_number.length === 0) {
                        //不需要增加新的空白,已有一个空白行了
                    } else {
                        this.rowData.push({goods_serial_number: "", order_number: 0});//添加空白数据
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
                        console.log("index:" + index);
                        this.rowData.splice(index, 1);
                    }
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
                },
                //编辑按钮是否可用,false:编辑按钮可用
                buttonUpdateFlag: function () {
                    // {key: "all", value: "全部"},
                    // {key: "save", value: "已保存"},
                    // {key: "audit", value: "已审核"},
                    // {key: "complete", value: "已完成"},
                    // {key: "close", value: "已关闭"},
                    return this.orderData.statusSelected === "save";
                },
                //数据是否可以编辑标记
                dataUpdateFlag: function () {
                    return this.orderData.statusSelected === "save" && this.flagCollect.operationFlag === 2;
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
        }

    };
    return page;
});
