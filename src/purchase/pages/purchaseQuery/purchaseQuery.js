define('purchase/pages/purchaseQuery/purchaseQuery', function (require, exports, module) {
    /*cabin插件工具*/

    // cabin.widgets.loading
    // cabin.widgets.minipop
    // cabin.widgets.pop
    // cabin.widgets.tips
    // cabin.tools.cookie

    var handle, _fn, page;
    page = Page({
        nodeClass: 'purchase-pages-purchaseQuery',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/purchaseQuery/purchaseQuery.css', 'purchase/pages/purchaseQuery/purchaseQuery.tpl'],
        show: function () {
            handle.jView = this.jView;
            /*页面进入触发*/
            /*支持tabs*/
            $('.nav-tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            /*分页插件*/
            $('#page').NextPage({
                pageSize: 30, //每页大小,
                currentPage: 1, //当前页
                totalCount: 0, //总条数
                pageRange: 9, //间隔多少个
                select: [30, 60, 100], //下拉选项
                showTotal:false,//显示总条数 boolean
                position: null, //位置 left right center 默认right
                callback: function (data) {
                    console.log(data);
                }
            });
        },
        hide: function () {
            /*页面离开触发*/
        },
        on: {
            /*事件绑定  事件名  筛选器 回调方法*/
            'click .show': function () {
                handle.jView.find('#myModal').modal('show');
            }

        }
    });
    handle = {};
    _fn = {};
    return page;
});
