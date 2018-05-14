<!--合同查询-->
<div class="purchase-pages-purchaseView content-container" id="purchase-pages-purchaseView"
     xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">

    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">

        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                新增采购订单
            </div>

            <div class="stage-search">
                <button class="btn btn-outline J_query_btn" v-on:click="updateOperationFlag(2)">编辑</button>
                <button class="btn btn-outline J_create_btn" v-on:click="updateOperationFlag(2)">新增</button>
                <button class="btn btn-outline J_audit_btn">审核</button>
                <button class="btn btn-outline J_delete_btn" v-show="flagCollect.operationFlag==2">保存</button>
                <button class="btn btn-primary J_delete_btn">返回</button>

            </div>

            <!--表单内容-->
            <div class="cabin-base-form clearfix">
                <div class="form-horizontal clearfix ">
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单类型</label>
                        <div class="base-form-content clearfix">
                            <select type="text" class="form-control" placeholder="请选择订单类型"
                                    v-model="rowData.classSelected" disabled>
                                <option v-for="option in orderClass" v-bind:value="option.key">{{option.value}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单编号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订单编号" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单状态</label>
                        <div class="base-form-content clearfix">
                            <select type="text" class="form-control" placeholder="请选择订单状态"
                                    v-model="rowData.statusSelected" disabled>
                                <option v-for="option in orderStatus" v-bind:value="option.key">{{option.value}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>供应商</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货地点</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订货地点" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货日</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订货日" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>预计到货日</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写到货日" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"></label>
                        <!--行模块：内容-->
                        <div class="base-form-content clearfix">
                            <div class="switch-inline">
                                <input type="checkbox" id="switch4" disabled>
                                <label for="switch4">
                                    <span>非加急订单</span>
                                    <span>加急订单</span>
                                </label>
                            </div>
                        </div>
                        <!--行模块：内容end-->
                    </div>
                </div>
            </div>
            <!--表单内容end-->
            <!--搜索条件结束-->
        </div>
        <!--搜索框 stage 结束-->

        <!--搜索结果stage-->
        <!--采购新增订单表格-->
        <div class="stage">
            <!--表格盒子-->
            <!--左右滑动表格-->
            <div class="table-responsive">
                <!--注:没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
                <!--表格-->
                <table class="cabinTable table table-hover  table-bottom-bordered table-event"
                       v-show="orderTableFlag == 1">
                    <thead>
                    <tr>
                        <th>行号</th>
                        <th>商品编号</th>
                        <th>商品名称</th>
                        <th>订购包装</th>
                        <th>订购数量</th>
                        <th>库存单位</th>
                        <th>库存单位数量</th>
                        <th>赠品</th>
                        <th>税率(%)</th>
                        <th style="min-width: 80px;">含税进价(￥)</th>
                        <th>含税金额(￥)</th>
                        <th>商品条码</th>
                        <th>允许超收</th>
                        <th>超收比例（%）</th>
                        <th style="width: 100px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="event">1</span></td>
                        <td>
                            <div><input class="form-control" value="商品编号1"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>商品名称1</div>
                        </td>
                        <td>
                            <div>订购包装1</div>
                        </td>
                        <td>
                            <div><input class="form-control" value="12.45"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>SK（库存单位）</div>
                        </td>
                        <td>
                            <div>20（库存单位数量）</div>
                        </td>
                        <td>
                            <div><input type="checkbox" disabled>
                                <label>赠品</label></div>
                        </td>
                        <td>
                            <div>7.06%</div>
                        </td>
                        <td>
                            <div>20000</div>
                        </td>
                        <td>
                            <div>1234456</div>
                        </td>
                        <td>
                            <div>12342124</div>
                        </td>
                        <td>
                            <div><input type="checkbox" disabled>
                                <label>允许超收</label></div>
                        </td>
                        <td>
                            <div>11%</div>
                        </td>
                        <td>
                            <div><span class="event">查看详情</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event">2</span></td>
                        <td>
                            <div><input class="form-control" value="商品编号1"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>商品名称2</div>
                        </td>
                        <td>
                            <div>订购包装2</div>
                        </td>
                        <td>
                            <div><input class="form-control" value="12.45"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>SK（库存单位）</div>
                        </td>
                        <td>
                            <div>10（库存单位数量）</div>
                        </td>
                        <td>
                            <div><input type="checkbox" disabled>
                                <label>赠品</label></div>
                        </td>
                        <td>
                            <div>11.05%</div>
                        </td>
                        <td>
                            <div>21333</div>
                        </td>
                        <td>
                            <div>1235452324</div>
                        </td>
                        <td>
                            <div>3542343423</div>
                        </td>
                        <td>
                            <div><input type="checkbox" disabled>
                                <label>允许超收</label></div>
                        </td>
                        <td>
                            <div>23.05%</div>
                        </td>
                        <td>
                            <div><span class="event">查看详情</span></div>
                        </td>
                    </tr>

                    <template v-for="item in items">
                        <tr>
                            <td><span class="event">2</span></td>
                            <td>
                                <div><input class="form-control" value="商品编号1"
                                            v-bind:disabled="flagCollect.operationFlag!=2"></div>
                            </td>
                            <td>
                                <div>商品名称2</div>
                            </td>
                            <td>
                                <div>订购包装2</div>
                            </td>
                            <td>
                                <div><input class="form-control" value="12.45"
                                            v-bind:disabled="flagCollect.operationFlag!=2"></div>
                            </td>
                            <td>
                                <div>SK（库存单位）</div>
                            </td>
                            <td>
                                <div>10（库存单位数量）</div>
                            </td>
                            <td>
                                <div><input type="checkbox" disabled>
                                    <label>赠品</label></div>
                            </td>
                            <td>
                                <div>11.05%</div>
                            </td>
                            <td>
                                <div>21333</div>
                            </td>
                            <td>
                                <div>1235452324</div>
                            </td>
                            <td>
                                <div>3542343423</div>
                            </td>
                            <td>
                                <div><input type="checkbox" disabled>
                                    <label>允许超收</label></div>
                            </td>
                            <td>
                                <div>23.05%</div>
                            </td>
                            <td>
                                <div><span class="event">查看详情</span></div>
                            </td>
                        </tr>
                    </template>

                    </tbody>
                </table>
                <!--表格 end-->
                <!--采购退单表格-->
                <!--注:没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
                <!--表格-->
                <table class="cabinTable table table-hover  table-bottom-bordered table-event"
                       v-show="orderTableFlag == 2">
                    <thead>
                    <tr>
                        <th>行号</th>
                        <th>商品编号</th>
                        <th>商品名称</th>
                        <th>退货包装</th>
                        <th>退货数量</th>
                        <th>库存单位</th>
                        <th>库存单位数量</th>
                        <th>税率(%)</th>
                        <th style="min-width: 80px;">含税退货价(￥)</th>
                        <th>含税退货金额(￥)</th>
                        <th>退货原因</th>
                        <th style="width: 100px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="event">1</span></td>
                        <td>
                            <div><input class="form-control" value="商品编号1"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>商品名称1</div>
                        </td>
                        <td>
                            <div>退货包装1</div>
                        </td>
                        <td>
                            <div><input class="form-control" value="12.45"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>SK（库存单位）</div>
                        </td>
                        <td>
                            <div>10（库存单位数量）</div>
                        </td>
                        <td>
                            <div>10.45%</div>
                        </td>
                        <td>
                            <div>232124.22</div>
                        </td>
                        <td>
                            <div>232124.22</div>
                        </td>
                        <td>
                            <div><select class="form-control">
                                <option value="B1">高库存退货</option>
                                <option value="B2">促销品退货</option>
                                <option value="B3">残次品退货</option>
                                <option value="B4">淘汰品退货</option>
                                <option value="B5">质量问题退货</option>
                                <option value="B6">临期退货</option>
                                <option value="B7">清户退货</option>
                                <option value="B8">订单申偿</option>
                            </select></div>
                        </td>

                        <td>
                            <div><span class="event">查看详情</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="event">2</span></td>
                        <td>
                            <div><input class="form-control" value="商品编号1"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>商品名称2</div>
                        </td>
                        <td>
                            <div>退货包装1</div>
                        </td>
                        <td>
                            <div><input class="form-control" value="12.45"
                                        v-bind:disabled="flagCollect.operationFlag!=2"></div>
                        </td>
                        <td>
                            <div>SK（库存单位）</div>
                        </td>
                        <td>
                            <div>20（库存单位数量）</div>
                        </td>
                        <td>
                            <div>12.23%</div>
                        </td>
                        <td>
                            <div>124.11</div>
                        </td>
                        <td>
                            <div>21.55</div>
                        </td>
                        <td>
                            <div><select class="form-control">
                                <option value="B1">高库存退货</option>
                                <option value="B2">促销品退货</option>
                                <option value="B3">残次品退货</option>
                                <option value="B4">淘汰品退货</option>
                                <option value="B5">质量问题退货</option>
                                <option value="B6">临期退货</option>
                                <option value="B7">清户退货</option>
                                <option value="B8">订单申偿</option>
                            </select></div>
                        </td>
                        <td>
                            <div><span class="event">查看详情</span></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--表格 end-->
            </div>
            <!--左右滑动表格 end-->

            <!--分页-->
            <div id="page"></div>
            <!--分页end-->

        </div>

        <div class="stage">
            <div class="cabin-base-form clearfix">
                <div class="form-horizontal clearfix ">
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>制单人</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写制单人" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>制单时间</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写制单时间" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>审核人</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写审核人" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>审核时间</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写审核时间" disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--搜索结果stage end-->
    </div>
</div>
