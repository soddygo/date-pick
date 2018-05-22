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

        searchOrderMain: "/purchaseOrderMain/search",//订单基本信息搜索,从订单基本信息里搜索
        searchOrderGoods: "/purchaseCollect/searchOrderGoods",//订单基本信息搜索,从商品明细表里搜索
        insertOrder:"/purchaseCollect/insertOrder",//新增订单信息保存
        deleteByOrderId:"/purchaseCollect/deleteByOrderId",//删除订单


    }
    CGI = {};
    module.exports = $.extend({}, {
        URL: URL,
        URL1: URL1
    });
});
