<!--合同查询-->
<div class="purchase-pages-search content-container">
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

    <!--滚动内容 需要添加 container-scroll 类-->
    <div class="container-scroll">
        <!--搜索框 stage-->
        <div class="stage">
            <div class="stage-title flag">
                合同查询
            </div>
            <!--搜索条件-->
            <div class="cabin-search-box clearfix">
                <form class="form-inline">
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="email" class="form-control" placeholder="jane.doe@example.com">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label class="control-label">最好四个</label>
                        <input type="text" class="form-control" placeholder="Jane Doe">
                    </div>
                    <div class="form-group cabin-date-range">
                        <label class="control-label">时间选择</label>
                        <input type="text" class="form-control icondate" placeholder="placeholder">
                        <label class="cabin-date-spin">-</label>
                        <input type="text" class="form-control icondate" placeholder="placeholder">
                    </div>
                </form>
            </div>
            <!--搜索条件结束-->
            <hr/>
            <!--搜索按钮-->
            <div class="stage-search right">
                <button class="btn btn-primary">按钮</button>
                <button class="btn btn-outline">其他按钮</button>
            </div>
            <!--搜索按钮结束-->
        </div>
        <!--搜索框 stage 结束-->
        <!--tab导航-->
        <ul class="nav nav-tabs" role="tablist" id="myTab">
            <li role="presentation" class="active"><a  href="#yourtab1" aria-controls="yourtab1" role="tab" data-toggle="tab">tab标签1</a></li>
            <li role="presentation"><a  href="#yourtab2" aria-controls="yourtab2" role="tab" data-toggle="tab">tab标签2</a></li>
        </ul>
        <!--tab导航结束-->
        <!--搜索结果stage-->
        <div class="stage">
            <!-- tab导航内容-->
            <div class="tab-content">
                <!-- tab导航内容分块-->
                <div role="tabpanel" class="tab-pane active" id="yourtab1">
                    <div class="stage">
                        <!--表格盒子-->
                        <div class="cabinTable-box">
                            <!--左右滑动表格-->
                            <div class="table-responsive">
                                <!--表格-->
                                <table class="cabinTable table table-hover table-bordered">
                                    <thead>
                                    <tr>
                                        <th>表头1</th>
                                        <th>表头2</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><div>内容1</div></td>
                                        <td><div>内容</div></td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--分页容器-->
                        <div id="page"></div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="yourtab2">
                    <div class="stage">
                        <div>标签内容2</div>
                    </div>
                </div>
                <!-- tab导航内容分块结束-->
            </div>
            <!-- tab导航内容结束-->
        </div>
    </div>
</div>
