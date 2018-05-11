define('purchase/pages/vuePage/vuePage', function (require, exports, module) {
    var handle, page;
    page = Page({
        nodeClass: 'cabin-page-vuePage',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['purchase/pages/vuePage/vuePage.tpl', 'purchase/pages/vuePage/vuePage.css'],
        cabinVue: {
            //这里this 指向当前VUE 实例,仅支持es5语法！！已经默认添加了timepicker 指令
            //使用vue时　不要使用handle.jView 统一使用$ 筛选或者使用$(this.$el).find(xxx)去实现；this.$el为vue实例dom 节点
            //使用vue 后可以不使用page 的show hide 方法,建议使用vue 自己的 mounted 取代show方法 destroy 取代hide 方法
            el: '#app',
            //这里必须 使用一个方法返回给data
            data:function () {
                return {
                    pickerOpt: {
                        startView: 2,
                        minView: 2,
                        maxView: 3,
                        autoclose: 1,
                        width: '100%'
                    },
                    startDate: '',
                    codeNo: ''
                }
            },
            mounted: function () {
                //进入页面
                //cabinVue 里面所有的this 都指向当前这个vue 实例
                //vue 更多使用方法请查看vue官方文档
                this.$nextTick(function(){
                    //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

                })
            },
            //如果 不需要保存页面状态必须添加下面这个方法
            beforeDestroy:function () {
                Object.assign(this.$data, this.$options.data());
            },
            destroyed: function () {
                //离开页面方法
            },
            methods: {
                //自定义方法
                initEvt: function () {
                    console.log('mounted')
                }
            }
        }
    });
    return page;
});