define('purchase/config/apilist', function (require, exports, module) {
    var URL, URL1, CGI;
    URL = {
        //获取登录用户信息
        getUserInfo: 'user/getUserInfo' //获取登录用户信息
    };
    URL1 = {
        queryOrderCancel: "/purchaseOrderCancel/query/list",//退订订单查询
        queryOrderCancelView: "/purchaseOrderCancel/query/view",//退订订单详情
        queryOrderCancelUpdate: "/purchaseOrderCancel/query/update",//更新退订订单
        queryOrderCancelDelete: "/purchaseOrderCancel/query/delete",//删除退订订单
        queryOrder: "/purchaseOrder/query/list",//查询采购订单
        queryOrderView: "/purchaseOrder/query/view",//采购订单详情
        queryOrderUpdate: "/purchaseOrder/query/update",//采购订单更新
        queryOrderDelete: "/purchaseOrder/query/delete",//删除采购订单


    }
    CGI = {};
    module.exports = $.extend({}, {
        URL: URL,
        URL1: URL1
    });
});
