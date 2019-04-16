<template>
  <div class="cabin-base-form clearfix">
    <div class="form-horizontal clearfix">
      <template v-for="(item,index) in paramOption">
        <template v-if="item.searchFlag === 1">
          <div :key="item.id" v-if="item.viewType ==='text'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--输入框-->
            <label class="control-label">{{item.name}}</label>
            <input type="text" class="form-control" v-bind:placeholder="item.name"
                   v-bind:disabled="item.disable"
                   v-model="searchParam[item.code]"/>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='textarea'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--输入框-->
            <label class="control-label">{{item.name}}</label>
            <input type="text" class="form-control" v-bind:placeholder="item.name"
                   v-bind:disabled="item.disable"
                   v-model="searchParam[item.code]"/>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='number'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--输入框-->
            <label class="control-label">{{item.name}}</label>
            <input type="number" class="form-control" v-bind:placeholder="item.name"
                   v-bind:disabled="item.disable"
                   v-model="searchParam[item.code]"/>
          </div>

          <div :key="item.id" v-else-if="item.viewType ==='options'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--不带搜索下拉框-->
            <label class="control-label">{{item.name}}</label>
            <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                        v-bind:disabled="item.disable"
                        :options="choseOptionsNoSearch"
                        v-model="searchParam[item.code]">
              <option disabled>=={{item.name}}==</option>
              <option v-if="allFlagOption === true" value="">全部</option>
              <option v-bind:key="option.key" v-for="option in item.searchOptions"
                      v-bind:value="option.key">
                {{option.value}}
              </option>
            </vue-chosen>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='multiOptions'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--带搜索多选下拉框-->
            <label class="control-label">{{item.name}}</label>
            <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                        v-bind:disabled="item.disable"
                        multiple
                        :options="multipleChoseOptions"
                        v-model="searchParam[item.code]">
              <option disabled>=={{item.name}}==</option>
              <option v-if="allFlagOption === true" value="">全部</option>
              <option v-bind:key="option.key" v-for="option in item.searchOptions"
                      v-bind:value="option.key">
                {{option.value}}
              </option>
            </vue-chosen>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='optionsSearch'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--带搜索框下拉框-->
            <label class="control-label">{{item.name}}</label>
            <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                        v-bind:disabled="item.disable"
                        :options="choseOptions"
                        v-model="searchParam[item.code]">
              <option disabled>=={{item.name}}==</option>
              <option v-if="allFlagOption === true" value="">全部</option>
              <option v-bind:key="option.key" v-for="option in item.searchOptions"
                      v-bind:value="option.key">
                {{option.value}}
              </option>
            </vue-chosen>
          </div>

          <!--后台服务请求查询获得下拉选项-->
          <div :key="item.id" v-else-if="item.viewType ==='remoteOption'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--下拉框-->
            <label class="control-label">{{item.name}}</label>
            <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                        :options="choseOptions"
                        v-bind:disabled="item.disable"
                        v-model="searchParam[item.code]">
              <option disabled>=={{item.name}}==</option>
              <option v-if="allFlagOption === true" value="">全部</option>
              <option v-bind:key="option.code" v-for="option in item.options"
                      v-bind:value="option.code">
                {{option.name}}
              </option>
            </vue-chosen>
          </div>
          <!--后台服务请求查询获得下拉选项-->
          <div :key="item.id" v-else-if="item.viewType ==='remoteMultiOption'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <!--下拉框-->
            <label class="control-label">{{item.name}}</label>
            <vue-chosen type="text" class="form-control"
                        v-bind:placeholder="item.name"
                        v-bind:disabled="item.disable"
                        multiple
                        :options="multipleChoseOptions"
                        v-model="searchParam[item.code]">
              <option disabled>=={{item.name}}==</option>
              <option v-if="allFlagOption === true" value="">全部</option>
              <option v-bind:key="option.code" v-for="option in item.options"
                      v-bind:value="option.code">
                {{option.name}}
              </option>
            </vue-chosen>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='radio'"
               class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <!--单选radio-->
            <label class="control-label">{{item.name}}</label>

            <template v-for="(itemParam,index) in item.options">

              <div v-bind:key="item.code+index" class="radio-inline">
                <input type="radio" v-bind:id="item.code+index"
                       v-bind:value="itemParam.key"
                       v-model="searchParam[item.code]"
                       v-bind:disabled="itemParam.disable"
                       v-bind:name="item.code">
                <label v-bind:for="item.code+index">{{itemParam.value}}</label>
              </div>
            </template>
          </div>
          <div :key="item.id" v-else-if="item.viewType ==='time'"
               class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <label class="control-label">{{item.name}}</label>
            <div class="base-form-content clearfix date-group-box">
              <date-pick v-model="searchParam[item.code]"
                         format="YYYY-MM-DD"
                         placeholder="请选择日期"
              />
            </div>
          </div>
        </template>

      </template>
    </div>
  </div>
</template>

<script>
import 'jQuery'
import 'cabin/lib/daterangepicker/moment'
import 'cabin/lib/chosen/chosen.jquery.js'
import DatePick from './DatePick'

let VueChosen = require('cabin/widgets/vueChosen/vueChosen')

export default {
  name: 'VueSearchForm',
  props: {
    'value': {
      type: Object,
      default: () => {
        return {}
      }
    },
    'dataParamOption': {
      type: Array,
      default: () => {
        return []
      }
    },
    'allFlag': {
      type: String,
      default: () => {
        return 'true'
      }
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    function guid () {
      /**
         * @return {string}
         */
      function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }

      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4())
    }

    let defaultParams = {
      modalId: guid()
    }

    // chose参数
    let choseOptions = {
      no_results_text: '没有找到',
      search_contains: true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
      max_selected_options: 1, // 当select为多选时，最多选择个数
      disable_search: false, // 开启搜索功能
      width: '100%'
    }
    // 不带搜索框chose
    let choseOptionsNoSearch = {
      no_results_text: '没有找到',
      search_contains: true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
      max_selected_options: 1, // 当select为多选时，最多选择个数
      disable_search: true,
      width: '100%'
    }

    // chose参数,多选
    let multipleChoseOptions = {
      no_results_text: '没有找到',
      search_contains: true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
      width: '100%'
    }
    // 不带搜索框chose,多选
    let multipleChoseOptionsNoSearch = {
      no_results_text: '没有找到',
      search_contains: true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
      disable_search: true,
      width: '100%'
    }

    return {
      defaultParams: defaultParams,
      choseOptions: choseOptions,
      choseOptionsNoSearch: choseOptionsNoSearch,
      multipleChoseOptions: multipleChoseOptions,
      multipleChoseOptionsNoSearch: multipleChoseOptionsNoSearch
    }
  },
  beforeMount () {
    let Vue = this
    // 绑定对象初始化
    for (let obj of this.paramOption) {
      if (obj.viewType.indexOf('Multi') > 0 || obj.viewType.indexOf('multi') > 0 || obj.default instanceof Array) {
        if (obj.default != null && typeof obj.default !== 'undefined' && obj.default !== '') {
          let arr = []
          arr.push(obj.default)
          Vue.$set(this.searchParam, obj.code, arr)
        } else {
          Vue.$set(this.searchParam, obj.code, [])
        }
      } else {
        if (obj.default != null && typeof obj.default !== 'undefined') {
          Vue.$set(this.searchParam, obj.code, obj.default)
        } else {
          Vue.$set(this.searchParam, obj.code, '')
        }
      }
    }
  },
  methods: {
    setModelAttr (key, val) {
      this.$set(this.searchParam, key, val)
    }

  },
  computed: {
    paramOption () {
      return this.dataParamOption || []
    },
    searchParam () {
      return this.value || {}
    },
    allFlagOption () {
      if (this.allFlag === 'true') {
        return true
      } else {
        return false
      }
    }

  },
  components: {
    VueChosen, DatePick
  }
}
</script>

<style scoped>

</style>
