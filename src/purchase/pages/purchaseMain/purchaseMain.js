define('purchase/pages/purchaseMain/purchaseMain', function (require, exports, module) {
    /*cabin插件工具*/

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    var ajax = require('purchase/common/data/ajax');

    var handle, _fn, page;
    //object construct
    let order = {
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
    let orderClass = [
        {key: "all", value: "全部"},
        {key: "P01", value: "供应商采购订单"},
        {key: "P02", value: "配送采购订单"},
        {key: "P03", value: "供应商采购退单"},
        {key: "P04", value: "配送采购退单"},
        {key: "P05", value: "门店间调拨单"},
        {key: "P06", value: "大宗采购订单"},
    ];
    //订单状态
    let orderStatus = [
        {key: "all", value: "全部"},
        {key: "save", value: "已保存"},
        {key: "audit", value: "已审核"},
        {key: "complete", value: "已完成"},
        {key: "close", value: "已关闭"},
    ];
    //订单来源
    let orderSource = [
        {key: "all", value: "全部"},
        {key: "1", value: "手工创建"},
        {key: "2", value: "ERP同步"},

    ];

    page = Page({
        nodeClass: 'purchase-pages-purchaseMain',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/purchaseMain/purchaseMain.css', 'purchase/pages/purchaseMain/purchaseMain.tpl'],
        cabinVue: {
            //这里this 指向当前VUE 实例,仅支持es5语法！！已经默认添加了timepicker 指令
            //使用vue时　不要使用handle.jView 统一使用$ 筛选或者使用$(this.$el).find(xxx)去实现；this.$el为vue实例dom 节点
            //使用vue 后可以不使用page 的show hide 方法,建议使用vue 自己的 mounted 取代show方法 destroy 取代hide 方法
            el: '#purchase-pages-purchaseMain',
            //这里必须 使用一个方法返回给data
            data: function () {

                return {
                    order: order,
                    orderClass: orderClass,
                    orderStatus: orderStatus,
                    orderSource: orderSource,
                }
            },
            mounted: function () {
                //进入页面
                //cabinVue 里面所有的this 都指向当前这个vue 实例
                //vue 更多使用方法请查看vue官方文档
                this.$nextTick(function () {
                    //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

                });


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
                    console.log("点击了查询按钮,order.id:" + order.id);
                    ajax.post(ajax.queryOrder, {}, function (res) {
                        console.log(res.length);
                    });
                }
            }

        }
    });
    handle = {};
    _fn = {};
    return page;
});
