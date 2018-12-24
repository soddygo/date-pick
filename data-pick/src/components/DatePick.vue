<template>
  <input type="text" class="form-control"
         v-bind:placeholder="placeholder"
         v-bind:value="rangeDate"
  />
</template>

<script>
import 'jQuery'
import 'cabin/lib/daterangepicker/moment'
import 'cabin/lib/daterangepicker/daterangepicker'

export default {
  name: 'DatePick',
  props: [
    'value',
    'placeholder',
    'startDate',
    'endDate',
    'format'
  ],
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    let pickInfo = {
      startDate: '',
      endDate: ''
    }
    let params = {
      name: '',
      defaultPlaceholder: '',
      defaultFormat: 'YYYY-MM-DD'
    }

    return {
      pickInfo,
      params,

      msg: 'Welcome to Your Vue.js App test'
    }
  },
  computed: {
    rangeDate () {
      if (this.value.indexOf(',') > 0) {
        var valueList = this.value.split(',')
        return valueList.join(' - ')
      } else {
        return this.value
      }
    }
  },

  mounted: function () {
    var pickInfo = this.pickInfo
    var rangeDate = this.rangeDate
    var defaultFormat = this.params.defaultFormat

    var start = null
    var end = null
    if (this.startDate == null || typeof this.startDate === 'undefined' ||
      this.endDate == null || typeof this.endDate === 'undefined') {
      start = moment().startOf('day').subtract(0, 'days')
      end = moment().endOf('day').subtract(0, 'days')
    } else {
      start = this.startDate
      end = this.endDate
    }

    if (this.format != null && !(typeof this.format === 'undefined')) {
      defaultFormat = this.format
    }

    var Vue = this

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
        format: defaultFormat // 控件中from和to 显示的日期格式
      }
    },
    function (start, end, label) {
      // 格式化日期显示框,展示用
      pickInfo.startDate = start.format(defaultFormat)
      pickInfo.endDate = end.format(defaultFormat)

      rangeDate = pickInfo.startDate + ' - ' + pickInfo.endDate
      // console.log('选择后的时间范围value:' + value)
      Vue.$emit('update', pickInfo.startDate + ',' + pickInfo.endDate)
    })
    console.log('pickDate,js init finish')
  }
}
</script>

<style scoped>

</style>
