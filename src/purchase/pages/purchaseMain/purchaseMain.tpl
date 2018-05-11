<!--合同查询-->
<div class="purchase-pages-purchaseMain content-container">



    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">

        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                采购订单
            </div>

            <div class="stage-search">
                <button class="btn btn-outline J_search_btn">查询</button>
                <button class="btn btn-outline J_create_btn">新增</button>
                <button class="btn btn-outline J_query_btn">查看</button>
                <button class="btn btn-outline J_update_btn">修改</button>
                <button class="btn btn-outline J_delete_btn">删除</button>
                <button class="btn btn-outline J_audit_btn">审核</button>
            </div>


            <!--表单内容-->
            <div class="cabin-base-form clearfix">
                <div class="form-horizontal clearfix ">
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单编号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写订单编号"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>供应商</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订货日期</label>
                        <div class="base-form-content clearfix date-group-box">
                            <input type="text" class="form-control icondate icontime " placeholder="选择开始时间">
                            <label class="cabin-date-spin">至</label>
                            <input type="text" class="form-control icondate icontime" placeholder="选择结束时间">
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单类型</label>
                        <div class="base-form-content clearfix">
                            <select type="text" class="form-control" placeholder="请选择活动区域">
                                <option value="北京">北京</option>
                                <option value="成都">成都</option>
                                <option value="杭州">杭州</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单状态</label>
                        <div class="base-form-content clearfix">
                            <select type="text" class="form-control" placeholder="请选择活动区域">
                                <option value="北京">北京</option>
                                <option value="成都">成都</option>
                                <option value="杭州">杭州</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>商品</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>采销平台单号</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>订单来源</label>
                        <div class="base-form-content clearfix">
                            <select type="text" class="form-control" placeholder="请选择活动区域">
                                <option value="北京">北京</option>
                                <option value="成都">成都</option>
                                <option value="杭州">杭州</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"><span class="font-error"></span>创建人</label>
                        <div class="base-form-content clearfix">
                            <input type="text" class="form-control" placeholder="请填写供应商"/>
                        </div>
                    </div>
                    <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <label class="control-label"></label>
                        <!--行模块：内容-->
                        <div class="base-form-content clearfix">
                            <div class="checkbox-inline">
                                <input type="checkbox" id="checkbox1" checked>
                                <label for="checkbox1">加急订单</label>
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
                <button class="btn btn-primary">查询</button>
            </div>
            <!--搜索按钮结束-->
        </div>
        <!--搜索框 stage 结束-->

        <!--搜索结果stage-->
        <div class="stage">
            <!--表格盒子-->
            <!--左右滑动表格-->
            <div class="table-responsive">
                <!--注:没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
                <!--表格-->
                <table class="cabinTable table table-hover  table-bottom-bordered table-event">
                    <thead>
                    <tr>
                        <th><div class="checkbox">
                            <input type="checkbox" >
                            <label for="checkbox1"></label>
                        </div></th>
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
                    <tr>
                        <td><div class="checkbox">
                            <input type="checkbox" id="checkbox1">
                            <label for="checkbox1"></label>
                        </div></td>
                        <td><div>1111</div></td>
                        <td><div>采购订单</div></td>
                        <td><div>test1</div></td>
                        <td><div>1111.21</div></td>
                        <td><div>2018-05-11</div></td>
                        <td><div>2018-05-14</div></td>
                        <td><div>test订单来源</div></td>
                        <td><div> <input type="checkbox">
                            <label for="checkbox1"></label></div></td>
                        <td><div>admin</div></td>
                        <td><div>已审核</div></td>
                    </tr>
                    <tr>
                        <td><div class="checkbox">
                            <input type="checkbox" id="checkbox2">
                            <label for="checkbox1"></label>
                        </div></td>
                        <td><div>2222</div></td>
                        <td><div>采购订单</div></td>
                        <td><div>test1</div></td>
                        <td><div>1111.21</div></td>
                        <td><div>2018-05-11</div></td>
                        <td><div>2018-05-14</div></td>
                        <td><div>test订单来源</div></td>
                        <td><div> <input type="checkbox">
                            <label for="checkbox1"></label></div></td>
                        <td><div>admin</div></td>
                        <td><div>已审核</div></td>
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
        <!--搜索结果stage end-->
    </div>
</div>
