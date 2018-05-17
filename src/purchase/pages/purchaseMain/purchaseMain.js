define('purchase/pages/purchaseMain/purchaseMain', function (require, exports, module) {
    /*cabin插件工具*/

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    var ajax = require('purchase/common/data/ajax');

    require('cabin/lib/daterangepicker/moment.js');
    require('cabin/widgets/pddatepicker/pddatepicker.js');

    MINIPOP = require('cabin/widgets/minipop/minipop');


    var handle, _fn, page;
    page = Page({
        nodeClass: 'purchase-pages-purchaseMain',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/purchaseMain/purchaseMain.css', 'purchase/pages/purchaseMain/purchaseMain.tpl'],
        pageTitle: '采购管理',//当前页面需要展示的title
        cabinVue: {
            //这里this 指向当前VUE 实例,仅支持es5语法！！已经默认添加了timepicker 指令
            //使用vue时　不要使用handle.jView 统一使用$ 筛选或者使用$(this.$el).find(xxx)去实现；this.$el为vue实例dom 节点
            //使用vue 后可以不使用page 的show hide 方法,建议使用vue 自己的 mounted 取代show方法 destroy 取代hide 方法
            el: '#purchase-pages-purchaseMain',
            //这里必须 使用一个方法返回给data
            data: function () {
                //object construct
                var order = {
                    id: '',//订单编号
                    supplier: "",//供应商编号或者名称
                    goodsDateStart: "",//订货日期开始
                    goodsDateEnd: "",//订货日期结束
                    classSelected: "all",//订单类型
                    statusSelected: "all",//订单状态
                    goodsName: "",//商品编号或者名称
                    erpId: "",//ERP单号
                    marketingId: "",//采销平台单号
                    sourceSelected: "all",//订单来源
                    preparedByPeople: "",//创建人
                    urgenFlag: false,//加急订单标记,false:普通订单;true:加急订单
                };
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
                    {key: "1", value: "已保存"},
                    {key: "2", value: "已审核"},
                    {key: "3", value: "已完成"},
                    {key: "4", value: "已关闭"},
                ];
                //订单来源
                var orderSource = [
                    {key: "all", value: "全部"},
                    {key: "1", value: "手工创建"},
                    {key: "2", value: "ERP同步"},
                ];

                //订单明细
                var orderRow = [];

                //订单明细被选中的行
                var currentCheckedFlag = false;
                var orderRowChecked = [];

                return {
                    order: order,
                    orderRow: orderRow,
                    orderRowChecked: orderRowChecked,
                    currentCheckedFlag: currentCheckedFlag,
                    orderClass: orderClass,
                    orderStatus: orderStatus,
                    orderSource: orderSource,
                }
            },
            mounted: function () {
                var order = this.order ;
                //进入页面
                //cabinVue 里面所有的this 都指向当前这个vue 实例
                //vue 更多使用方法请查看vue官方文档
                this.$nextTick(function () {
                    //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

                });

                //init datePick
                //current date
                var currentDateStr = moment().format('YYYY-MM-DD');
                console.log("currentDateStr:" + currentDateStr);
                $('#goodsDateStart').PdDatePicker({
                    startView: 2,
                    minView: 3,
                    initDate: currentDateStr,
                    format: 'YYYY-MM-DD',
                    //containerId: 'abc'
                }).on('change', function (evt, data) {
                    var date = moment(data).format('YYYY-MM-DD');
                    order.goodsDateStart = date;
                });
                $('#goodsDateEnd').PdDatePicker({
                    startView: 2,
                    minView: 3,
                    initDate: currentDateStr,
                    format: 'YYYY-MM-DD',
                    //containerId: 'abc'
                }).on('change', function (evt, data) {
                    var date = moment(data).format('YYYY-MM-DD');
                    order.goodsDateEnd = date;
                });

                this.order.goodsDateStart = currentDateStr;
                this.order.goodsDateEnd = currentDateStr;


                //分页初始化
                $('#page').NextPage({
                    pageSize: 30, //每页大小,
                    currentPage: 1, //当前页
                    totalCount: 200, //总条数
                    pageRange: 9, //间隔多少个
                    select: [30, 60, 100], //下拉选项
                    showTotal: true,//显示总条数 boolean
                    position: null, //位置 left right center
                    callback: function (data) {
                        //todo
                    }
                });

                //订单明细,添加测试数据
                var temp1 = {
                    order_class: "P01",//'订单类型',
                    order_class_name: "供应商采购订单",//'订单类型中文名称',
                    order_id: "2222",//'订单编号，编号生成逻辑： PO+年月日+店号+流水号4位',
                    order_status: "已保存",//'订单状态',
                    supplier_bh: "供应商编号11",//'供应商编号',
                    supplier_name: "供应商名称11",//'供应商名称',
                    order_goods_address: "test",//'订货地点',
                    order_goods_date: "2018-05-01",//'订货日期',
                    urgen_flag: false,//'加急订单标记',
                    predict_date: "2018-05-05",//'预计到货日期',
                    erp_serial_number: "111",//'ERP编号',
                    marketing_serial_number: "1111",//'采销平台编号',
                    order_source: "手工创建",//'订单来源',
                    tax_included_amount: 100,// '含税金额',
                };
                var temp2 = {
                    order_class: "P01",//'订单类型',
                    order_class_name: "供应商采购订单",//'订单类型中文名称',
                    order_id: "1111",//'订单编号，编号生成逻辑： PO+年月日+店号+流水号4位',
                    order_status: "已保存",//'订单状态',
                    supplier_bh: "供应商编号11",//'供应商编号',
                    supplier_name: "供应商名称11",//'供应商名称',
                    order_goods_address: "test",//'订货地点',
                    order_goods_date: "2018-05-01",//'订货日期',
                    urgen_flag: true,//'加急订单标记',
                    predict_date: "2018-05-05",//'预计到货日期',
                    erp_serial_number: "111",//'ERP编号',
                    marketing_serial_number: "1111",//'采销平台编号',
                    order_source: "手工创建",//'订单来源',
                    tax_included_amount: 100,// '含税金额',
                };
                this.orderRow.push(temp1);
                this.orderRow.push(temp2);

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
                doQuery: function () {
                    console.log("点击了查询按钮,order.id:" + this.order.id);
                    ajax.post(ajax.queryOrderCancel, {}, function (res) {
                        console.log(res.length);
                    });
                },
                //双击查看详情
                dbClickView: function (event, orderId) {
                    //双击查看行数据明细
                    // kayak.router.go('#index/xxx/xxx:id=1&code=2')
                    kayak.router.go("#full/purchase/purchaseView:classSelected=" + this.order.classSelected
                        + "&statusSelected=" + this.order.statusSelected + "&operationFlag=1"
                        + "&orderId=" + orderId);
                },
                testClick: function (event) {
                    console.log("order.urgenFlag:" + this.order.urgenFlag);
                    console.log("this.order.goodsDateEnd :" + this.order.goodsDateEnd);
                },
                //新增采购订单,或者采购退单
                createOrder: function (event) {
                    //主界面,不需要验证是否有数据未保存
                    kayak.router.go('#full/purchase/purchaseCreate:classSelected=' + this.order.classSelected)
                },
                //删除订单
                deleteRow: function (event) {
                   var orderRow =  this.orderRow;
                    var tempOrderRowChecked = this.orderRowChecked;
                    if (tempOrderRowChecked.length === 0) {
                        //没有选中的选项,禁止操作删除按钮
                    } else {
                        //1.弹窗确认
                        MINIPOP.show({
                            title: '警告',
                            msg: "是否确认删除!",
                            ok: '确认',
                            cancel: '取消',
                            sort: 'right', //left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
                            callback: function (el, type) {
                                if (type === 'ok') {
                                    //todo 删除订单数据
                                    //1. 删除前端数据
                                    for (_index in tempOrderRowChecked) {
                                        var _orderId = tempOrderRowChecked[_index];
                                        for (_rowIndex in orderRow) {
                                            var rowItem = orderRow[_rowIndex];
                                            if (_orderId === rowItem.order_id) {
                                                orderRow.splice(_rowIndex, 1);
                                            }
                                        }
                                    }
                                    //2. 调用后端数据
                                } else if (type === 'cancel') {
                                    //无操作,停留当前界面
                                }
                            }
                        });
                    }
                },
                //选中当前页所有行数据
                checkedAll: function (event) {
                    if (this.currentCheckedFlag) {
                        //全不选逻辑
                        this.orderRowChecked.splice(0, this.orderRowChecked.length);
                    } else {
                        this.orderRowChecked.splice(0, this.orderRowChecked.length);
                        for (_index in this.orderRow) {
                            var item = this.orderRow[_index];
                            this.orderRowChecked.push(item.order_id);
                        }
                    }
                }
            },
            computed: {
                //删除按钮的禁用标记,true:禁用,false:按钮可用
                deleteButtonFlag: function () {
                    return this.orderRowChecked.length === 0;
                },
                auditButtonFlag: function () {
                    return this.orderRowChecked.length === 0;
                },
                lookButtonFlag: function () {
                    return this.orderRowChecked.length === 0 || this.orderRowChecked.length > 1;
                }
            }

        }
    });
    handle = {};
    _fn = {};
    return page;
});
