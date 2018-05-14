define('purchase/pages/purchaseView/purchaseView', function (require, exports, module) {
    /*cabin插件工具*/

    MINIPOP = require('cabin/widgets/minipop/minipop');

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    var handle, _fn, page;
    //订单类型枚举
    let orderClass = [
        {key: "all", value: "全部"},
        {key: "P01", value: "供应商采购订单"},
        {key: "P02", value: "配送采购订单"},
        {key: "P03", value: "供应商采购退单"},
        {key: "P04", value: "配送采购退单"},
        // {key: "P05", value: "门店间调拨单"},
        // {key: "P06", value: "大宗采购订单"},
    ];
    //订单状态
    let orderStatus = [
        {key: "all", value: "全部"},
        {key: "save", value: "已保存"},
        {key: "audit", value: "已审核"},
        {key: "complete", value: "已完成"},
        {key: "close", value: "已关闭"},
    ];
    //当前页面是否可以修改等标记
    let flagCollect = {
        operationFlag: 1,//1:查看; 2:修改
        hasSaveFlag: 1,//1:已经保存;2:存在未保存数据
        // orderTableFlag: 1,//1:采购订单显示;2:采购退单显示
    };
    //行数据信息
    //TODO 初始化数据,后面要修改,这里是便于测试用
    let rowData = {
        classSelected: "P01",
        statusSelected: "save",

    };
    //采购订单明细
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

                return {
                    rowData: rowData,
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
                let params = kayak.router.requestParam;
                rowData = $.extend(rowData, params);
                flagCollect.operationFlag = params.operationFlag;//当前页面查看标记,只读,还是编辑模式
                console.log("params:" + JSON.stringify(params));
                console.log("flagCollect.operationFlag:" + JSON.stringify(flagCollect.operationFlag));

                //init datePick
                //current date
                let currentDateStr = moment().format('YYYY-MM-DD');
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
                    }
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
                //编辑
                updateOperationFlag: function (flag) {
                    flagCollect.operationFlag = flag
                },
                //新增采购订单,或者采购退单
                createOrder: function (event) {
                    if (flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否继续新增订单?")
                    } else {
                        //跳转到新增采购订单界面,订单类型,以当前页面中选择的订单类型为准
                        kayak.router.go('#full/purchase/purchaseMain:classSelected=' + this.rowData.classSelected)
                    }
                },
                //保存订单修改
                save: function (event) {
                    //todo
                },
                //返回操作
                reback: function (event) {
                    if (flagCollect.hasSaveFlag === 2) {
                        //有未保存的数据
                        _fn.exitCurrentPage("当前界面信息未保存,是否放弃并返回?")
                    } else {
                        kayak.router.go('#full/purchase/purchaseMain:classSelected=' + this.rowData.classSelected)
                    }
                },
                audit: function (event) {
                    //TODO
                },
                changeSaveFlag: function (event) {
                    flagCollect.hasSaveFlag = 2;//存在未保存数据
                }

            },
            computed: {
                //1:采购订单显示;2:采购退单显示
                orderTableFlag: function () {
                    //采购订单,和采购退单的table列表切换
                    //        orderTableFlag: 1,//1:采购订单显示;2:采购退单显示
                    if (this.rowData.classSelected === "P01") {
                        return 1;
                    } else if (this.rowData.classSelected === "P02") {
                        return 1;
                    } else if (this.rowData.classSelected === "P03") {
                        return 2;
                    } else if (this.rowData.classSelected === "P04") {
                        return 2;
                    } else if (this.rowData.classSelected === "P05") {
                        //第一期无此业务
                        return 0;
                    } else if (this.rowData.classSelected === "P06") {
                        //走其他系统处理,不走此系统
                        return 0;
                    } else {
                        //实际生产,不应该走到这个逻辑,这里是本地测试才会用到的条件分支
                        return 1;
                    }
                }
            }

        }
    });
    handle = {};
    _fn = {
        //存在未修改数据,离开当前页面信息提示
        exitCurrentPage: function (msg) {
            MINIPOP.show({
                title: '警告',
                msg: msg,
                ok: '确认',
                cancel: '取消',
                sort: 'right', //left(默认为left):cancel按钮在左，ok按钮在右,right:cancel按钮在右，ok按钮在左
                callback: function (el, type) {
                    if (type === 'ok') {
                        kayak.router.go('#full/purchase/purchaseMain:classSelected=all')
                    } else if (type === 'cancel') {
                        //无操作,停留当前界面
                    }
                }
            });
        }

    };
    return page;
});
