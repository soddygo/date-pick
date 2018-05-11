<!--如果要保存页面状态 请在同id级添加 keep-alive 标签 并且在js beforeDestroy 方法内去掉Object.assign 方法  <div id="app" keep-alive></div> -->
<div class="cabin-page-vuePage content-container" id="app" xmlns:v-timepicker="http://www.w3.org/1999/xhtml">
    <div class="content-container">
        <!--固定位置内容-->
        <div class="container-fixed">
            <!--面包屑-->
            <div class="bread">
                <div class="bread-back"></div>
                <div class="bread-content">
                    <ul>
                        <li><a>首页</a></li>
                        <li><a>合同管理</a></li>
                        <li class="active"><a>合同查询</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--固定位置内容结束-->
        <!--滚动内容-->
        <div class="container-scroll">
            <!--搜索框 stage-->
            <div class="stage">
                <div class="stage-title flag">
                    搜索页面模板
                </div>
                <!--搜索条件-->
                <div class="cabin-search-form ">
                    <div class="form-horizontal clearfix">
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">地区地区</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">地区地区</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">时间</label>
                            <input type="text" class="form-control icondate"/>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">地区地区</label>
                            <select class="form-control mulitSearchSelectBox">
                                <option value="300">华北</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-horizontal clearfix">
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">地区地区</label>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="control-label">地区地区</label>
                            <!-- 使用select 必须添加form-control 类 chosen 配置项 width 请勿配置 -->
                            <select  class="form-control" v-model="codeNo" v-timepicker:chosen:code_no="pickerOpt">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label class="control-label">时间</label>
                            <input type="text" class="form-control icondate"/>
                            <span class="date-spin">-</span>
                            <input type="text" class="form-control icondate"/>
                        </div>
                    </div>
                </div>
                <!--搜索条件结束-->
                <hr/>
                <!--搜索按钮-->
                <div class="stage-search right">
                    <button class="btn btn-primary">按钮</button>
                    <button class="btn btn-outline show">展示模态框</button>
                </div>
                <!--搜索按钮结束-->
            </div>
            <!--搜索框 stage 结束-->
            <!--tab导航-->
            <ul class="nav nav-tabs" role="tablist" id="myTab">
                <li role="presentation" class="active"><a href="#yourtab1" aria-controls="yourtab1" role="tab"
                                                          data-toggle="tab">tab标签1</a></li>
                <li role="presentation"><a href="#yourtab2" aria-controls="yourtab2" role="tab"
                                           data-toggle="tab">tab标签2</a></li>
            </ul>
            <!--tab导航结束-->
            <!--搜索结果stage-->
            <div class="stage">
                <!-- tab导航内容-->
                <div class="tab-content">
                    <!-- tab导航内容分块-->
                    <div role="tabpanel" class="tab-pane active" id="yourtab1">
                        <div class="stage">
                            <!--左右滑动表格-->
                            <div class="table-responsive">
                                <!--表格-->
                                <table class="cabinTable table table-hover">
                                    <thead>
                                    <tr>
                                        <th>店铺名称</th>
                                        <th>合同号</th>
                                        <th>合同类型</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>内容</div>
                                        </td>
                                        <td>
                                            <div>内容</div>
                                        </td>
                                        <td>
                                            <div>内容</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--分页容器-->
                            <div id="page"></div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="yourtab2">
                        <div class="stage">
                            <div>2423</div>
                        </div>
                    </div>
                    <!-- tab导航内容分块结束-->
                </div>
                <!-- tab导航内容结束-->
            </div>


        </div>
        <!--滚动内容结束-->

        <!--模态框使用案例-->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
            <!-- 设置模态框宽度-->
            <div class="modal-dialog" role="document" style="width:60%;">
                <div class="modal-content">
                    <div class="modal-header clearfix">
                        <div class="stage-title flag pull-left">
                            <span>模态框标题</span>
                        </div>
                        <div class="stage-title pull-right">
                            <span class="cabin-big-icon close" data-dismiss="modal" aria-label="Close"></span>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div>模态框body</div>
                    </div>
                    <div class="modal-footer clearfix">
                        <button type="button" class="btn btn-outline" data-dismiss="modal" aria-label="Close">取消
                        </button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>