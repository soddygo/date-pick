<template>
  <!--<div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">-->
  <!--<label class="control-label">test</label>-->
  <!--&lt;!&ndash;<input type="text" class="form-control"  v-bind:value="msg"/>&ndash;&gt;-->
  <!--<div class="base-form-content clearfix">-->
  <!--<input type="text" class="form-control" v-bind:value="goodsDateStart"/>-->
  <!--</div>-->
  <!--</div>-->
  <input type="text" class="form-control" placeholder="订货日期"

  />
</template>

<script>
import 'jQuery'
import 'cabin/lib/daterangepicker/moment'
import 'cabin/lib/daterangepicker/daterangepicker'

export default {
  name: 'DatePick',
  data () {
    let pickInfo = {
      rangeDate: '2018',
      startDate: '',
      endDate: ''
    }
    let params = {
      name: '',
      placeholder: ''
    }

    return {
      pickInfo,
      params,
      goodsDateStart: moment(), // 订货日期开始

      msg: 'Welcome to Your Vue.js App test'
    }
  },
  props: [
    'value'
  ],
  mounted: function () {
    var pickInfo = this.pickInfo

    var start = moment().startOf('day').subtract(0, 'days')
    var end = moment().endOf('day').subtract(0, 'days')

    $(this.$el).daterangepicker({
      startDate: start,
      endDate: end,
      'alwaysShowCalendars': true,
      'autoApply': true,
      ranges: {
        '今天': [moment().subtract(0, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
        '昨天': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        '最近3天': [moment().subtract(2, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
        '最近7天': [moment().subtract(6, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
        '最近15天': [moment().subtract(14, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
        '最近30天': [moment().subtract(29, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')]
      },
      locale: {
        applyLabel: '确定',
        cancelLabel: '取消',
        fromLabel: '起始时间',
        toLabel: '结束时间',
        customRangeLabel: '自定义',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1,
        format: 'YYYY-MM-DD' // 控件中from和to 显示的日期格式
      }
    },
    function (start, end, label) {
      // 格式化日期显示框,展示用
      // pickInfo.rangeDate = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD')
      //
      // //传送后台用
      // order.goodsDateStart = start.startOf('day').format('YYYY-MM-DD');
      // order.goodsDateEnd = end.endOf('day').format('YYYY-MM-DD');
    })
    console.log('pickDate,js init finish')
  }
}
</script>

<style scoped>

</style>
