<!--合同查询-->
<div class="purchase-pages-purchaseCreate content-container" id="purchase-pages-purchaseCreate"
     xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">

        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                新增采购订单
            </div>

            <div class="stage-search">
                <button class="btn btn-outline J_delete_btn" v-on:click="createOrder($event)">新增</button>
                <button class="btn btn-outline J_delete_btn" v-on:click="save($event)">保存</button>
                <button class="btn btn-primary J_delete_btn" v-on:click="reback($event)">返回</button>

            </div>

            <!--表单内容-->
            <div class="cabin-base-form clearfix">
                <div class="form-horizontal clearfix ">
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单类型</label>
                        <div class="base-form-content clearfix">
                            <vue-chosen type="text" class="form-control" placeholder="请选择订单类型"
                                    v-model="orderData.classSelected">
                                <option v-for="option in orderClass" v-bind:value="option.key">{{option.value}}</option>
                            </vue-chosen>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单编号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订单编号"
                                   v-model="orderData.goods_serial_number"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单状态</label>
                        <div class="base-form-content clearfix">
                            <vue-chosen type="text" class="form-control" placeholder="请选择订单状态"
                                    v-model="orderData.statusSelected" disabled>
                                <option v-for="option in orderStatus" v-bind:value="option.key">{{option.value}}
                                </option>
                            </vue-chosen>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>供应商</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商"
                                   v-model="orderData.supplier_bh"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货地点</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订货地点"
                                   v_model="orderData.order_goods_address" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货日</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订货日"
                                   v-model="orderData.order_goods_date" disabled/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>预计到货日</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control icondate icontime" id="predict_date_id"
                                   placeholder="请填写到货日"
                                   v-model="orderData.predict_date"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"></label>
                        <!--行模块：内容-->
                        <div class="base-form-content clearfix">
                            <div class="switch-inline">
                                <input type="checkbox" id="switch4" v-model="orderData.urgen_flag">
                                <label for="switch4">
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
                <table class="cabinTable table table-hover  table-bottom-bordered table-event">
                    <thead>
                    <tr v-show="orderTableFlag == 1">
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
                    <tr v-show="orderTableFlag == 2">
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
                    <template v-for="(item,index) in rowData">
                        <!--订购-start-->
                        <tr v-show="orderTableFlag == 1">
                            <td><span class="event">{{index+1}}</span></td>
                            <td>
                                <div><input class="form-control" value="" placeholder="请输入商品编号" v-on:change="addRow"
                                            v-model="item.goods_serial_number"></div>
                            </td>
                            <td>
                                <div>{{item.goods_name}}</div>
                            </td>
                            <td>
                                <div>{{item.order_pack}}</div>
                            </td>
                            <td>
                                <div><input type="number" step="0.01" class="form-control" value=""
                                            placeholder="支持小数点2位"
                                            v-model="item.order_number"></div>
                            </td>
                            <td>
                                <div>{{item.repertory_unit}}</div>
                            </td>
                            <td>
                                <div>{{item.repertory_number}}</div>
                            </td>
                            <td>
                                <div><input type="checkbox" v-model="item.gift" disabled>
                                    <label></label></div>
                            </td>
                            <td>
                                <div>{{item.tax_rate}}</div>
                            </td>
                            <td>
                                <div>{{item.tax_included_pay}}</div>
                            </td>
                            <td>
                                <div>{{item.tax_included_amount}}</div>
                            </td>
                            <td>
                                <div>{{item.goods_bar_code}}</div>
                            </td>
                            <td>
                                <div><input type="checkbox" v-model="item.allow_excess" disabled>
                                    <label></label></div>
                            </td>
                            <td>
                                <div>{{item.excess_ratio}}</div>
                            </td>
                            <td>
                                <div><span class="event" v-on:click="deleteRow($event,index)"
                                           v-if="rowData.length !== index + 1">删除</span></div>
                            </td>
                        </tr>
                        <!--订购-end-->
                        <!--退订-start-->
                        <tr v-show="orderTableFlag == 2">
                            <td><span class="event">{{index+1}}</span></td>
                            <td>
                                <div><input class="form-control" value="" placeholder="请输入商品编号" v-on:change="addRow"
                                            v-model="item.goods_serial_number"></div>
                            </td>
                            <td>
                                <div>{{item.goods_name}}</div>
                            </td>
                            <td>
                                <div>{{item.order_pack}}</div>
                            </td>
                            <td>
                                <div><input type="number" step="0.01" class="form-control" value=""
                                            placeholder="支持小数点2位"
                                            v-model="item.order_number"></div>
                            </td>
                            <td>
                                <div>{{item.repertory_unit}}</div>
                            </td>
                            <td>
                                <div>{{item.repertory_number}}</div>
                            </td>
                            <td>
                                <div>{{item.tax_rate}}</div>
                            </td>
                            <td>
                                <div>{{item.tax_included_pay}}</div>
                            </td>
                            <td>
                                <div>{{item.tax_included_amount}}</div>
                            </td>
                            <td>
                                <div>
                                    <div><select class="form-control" v-model="item.cancel_reason">
                                        <option value="B1">高库存退货</option>
                                        <option value="B2">促销品退货</option>
                                        <option value="B3">残次品退货</option>
                                        <option value="B4">淘汰品退货</option>
                                        <option value="B5">质量问题退货</option>
                                        <option value="B6">临期退货</option>
                                        <option value="B7">清户退货</option>
                                        <option value="B8">订单申偿</option>
                                    </select></div>
                                </div>
                            </td>
                            <td>
                                <div><span class="event" v-on:click="deleteRow($event,index)"
                                           v-if="rowData.length !== index + 1">删除</span></div>
                            </td>
                        </tr>
                        <!--退订-end-->
                    </template>

                    </tbody>
                </table>
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
