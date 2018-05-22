<!--合同查询-->
<div class="purchase-pages-purchaseMain content-container" id="purchase-pages-purchaseMain"
     xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">

        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                采购订单
            </div>

            <div class="stage-search">
                <!--<button class="btn btn-outline J_search_btn">查询</button>-->
                <button class="btn btn-outline J_create_btn" v-on:click="createOrder">新增</button>
                <button class="btn btn-outline J_query_btn" v-on:click="dbClickView" v-bind:disabled="lookButtonFlag">查看</button>
                <!--<button class="btn btn-outline J_update_btn">修改</button>-->
                <button class="btn btn-outline J_delete_btn" v-on:click="deleteRow" v-bind:disabled="deleteButtonFlag">删除</button>
                <button class="btn btn-outline J_audit_btn"  v-bind:disabled="auditButtonFlag">审核</button>
            </div>


            <!--表单内容-->
            <div class="cabin-base-form clearfix">
                <div class="form-horizontal clearfix ">
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label">订单编号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订单编号" v-model="order.orderId"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>供应商</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商" v-model="order.supplier"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货日期</label>
                        <div class="base-form-content clearfix date-group-box">
                            <input type="text" class="form-control icondate icontime " id="goodsDateStart"
                                   placeholder="选择开始时间"
                                   v-model="order.goodsDateStart">
                            <label class="cabin-date-spin">至</label>
                            <input type="text" class="form-control icondate icontime" id="goodsDateEnd"
                                   placeholder="选择结束时间"
                                   v-model="order.goodsDateEnd">
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单类型</label>
                        <div class="base-form-content clearfix">
                            <vue-chosen type="text" class="form-control" placeholder="请选择订单类型"
                                    v-model="order.classSelected">
                                <option v-for="option in orderClass" v-bind:value="option.key">{{option.value}}</option>
                            </vue-chosen>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单状态</label>
                        <div class="base-form-content clearfix">
                            <vue-chosen type="text" class="form-control" placeholder="请选择订单状态"
                                    v-model="order.statusSelected">
                                <option v-for="option in orderStatus" v-bind:value="option.key">{{option.value}}
                                </option>
                            </vue-chosen>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>商品</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写商品" v-model="order.goodsName"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>ERP单号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写ERP单号" v-model="order.erpId"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>采销平台单号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写采销平台单号"
                                   v-model="order.marketingId"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单来源</label>
                        <div class="base-form-content clearfix">
                            <vue-chosen type="text" class="form-control" placeholder="请选择订单来源"
                                    v-model="order.sourceSelected">
                                <option v-for="option in orderSource" v-bind:value="option.key">{{option.value}}
                                </option>
                            </vue-chosen>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>创建人</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写创建人"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"></label>
                        <!--行模块：内容-->
                        <div class="base-form-content clearfix">
                            <div class="switch-inline">
                                <input type="checkbox" id="switch_urgenFlag" v-model="order.urgenFlag"
                                       v-on:click="testClick">
                                <label for="switch_urgenFlag">
                                    <span>加急订单</span>
                                    <span>非加急订单</span>
                                </label>
                            </div>
                        </div>
                        <!--行模块：内容end-->
                    </div>
                </div>
            </div>
            <!--表单内容end-->
            <!--搜索条件结束-->
            <!--搜索按钮-->
            <div class="stage-search right">
                <button class="btn btn-primary" v-on:click="search">查询</button>
            </div>
            <!--搜索按钮结束-->
        </div>
        <!--搜索框 stage 结束-->

        <!--搜索结果stage-->
        <div class="stage" v-show="page.totalCount !== 0">
            <!--表格盒子-->
            <!--左右滑动表格-->
            <div class="table-responsive">
                <!--注:没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
                <!--表格-->
                <table class="cabinTable table table-hover  table-bottom-bordered table-event ">
                    <thead>
                    <tr>
                        <th>
                            <div class="checkbox">
                                <input type="checkbox" id="row_all" v-on:click="checkedAll" v-model="currentCheckedFlag">
                                <label for="row_all"></label>
                            </div>
                        </th>
                        <th>订单编号</th>
                        <th>订单类型</th>
                        <th>供应商</th>
                        <th>订货金额(￥)</th>
                        <th>订货日</th>
                        <th>预计到货日</th>
                        <th>订单来源</th>
                        <th>加急订单</th>
                        <th>创建人</th>
                        <th>订单状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item,index) in orderRow">
                        <tr v-on:dblclick="dbClickView($event,item.orderId)">
                            <td>
                                <div class="checkbox">
                                    <input type="checkbox" v-bind:id="item.orderId" v-bind:value="item.orderId"
                                           v-model="orderRowChecked">
                                    <label v-bind:for="item.orderId"></label>
                                </div>
                            </td>
                            <td>
                                <div>{{item.orderId}}</div>
                            </td>
                            <td>
                                <div>{{item.orderClassName}}</div>
                            </td>
                            <td>
                                <div>{{item.supplierName}}</div>
                            </td>
                            <td>
                                <div>{{item.taxIncludedAmount}}</div>
                            </td>
                            <td>
                                <div>{{item.orderGoodsDate}}</div>
                            </td>
                            <td>
                                <div>{{item.predictDate}}</div>
                            </td>
                            <td>
                                <div>{{item.orderSource | sourceFilter}}</div>
                            </td>
                            <td>
                                <div class="checkbox"><input type="checkbox" v-bind:id="item.order_id + 2"
                                                             v-model="item.urgen_flag">
                                    <label v-bind:for="item.order_id + 2"></label></div>
                            </td>
                            <td>
                                <div>{{item.preparedByPeople}}</div>
                            </td>
                            <td>
                                <div>{{item.orderStatusCode | statusFilter }}</div>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <!--表格 end-->


            </div>
            <!--左右滑动表格 end-->
            <!--分页-->
            <div id="page"></div>
            <!--分页end-->

        </div>
        <div style="min-height:400px;" v-show="page.totalCount === 0 && firstPageFlag === 1">
            <div class="empty-table">
                <div class="text" style="margin-bottom: -10px;font-size: 14px;line-height: 15px;text-align: center;">
                    <p>很抱歉，没有找到相关数据</p>
                </div>
            </div>
        </div>
        <!--搜索结果stage end-->
    </div>
</div>
