<template>
  <!-- Modal -->
  <div class="modal fade" v-bind:id="modalId" tabindex="-1"
       role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width:60%;">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header clearfix">
            <div class="stage-title flag pull-left">
              <span>{{modalTitle}}</span>
            </div>
            <div class="stage-title pull-right">
              <span class="cabin-big-icon close"  aria-label="Close"
                    v-on:click="hideModal">
              </span>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="cabin-base-form clearfix">
            <div class="form-horizontal clearfix">
              <template v-for="item in paramOption">
                <div :key="item.id"
                     v-if="item.viewType ==='text'  "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--输入框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true"  class="font-error">* </span>{{item.name}}</label>
                  <input type="text" class="form-control" v-bind:placeholder="item.name"
                         v-bind:disabled="viewFlag"
                         v-model="modalInfo[item.code]"
                         />
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='number' "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--输入框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <input type="number" class="form-control" v-bind:placeholder="item.name"
                         v-bind:disabled="viewFlag"
                         v-model="modalInfo[item.code]"
                         />
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='textarea' "
                     class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <!--输入框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <textarea name="" class="form-control" cols="50" rows="10"
                            v-bind:placeholder="item.name"
                            v-bind:disabled="viewFlag"
                            v-model="modalInfo[item.code]"
                            >
                  </textarea>
                </div>

                <div :key="item.id"
                     v-else-if="item.viewType ==='options' "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--带搜索框下拉框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                              v-bind:disabled="viewFlag"
                              :options="choseOptionsNoSearch"
                              v-model="modalInfo[item.code]"
                              >
                    <option disabled>=={{item.name}}==</option>
                    <option v-bind:key="option.key" v-for="option in item.options"
                            v-bind:value="option.key"
                            >
                      {{option.value}}
                    </option>
                  </vue-chosen>
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='optionsSearch' "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--没搜索框的下拉框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <vue-chosen type="text" class="form-control" v-bind:placeholder="item.name"
                              v-bind:disabled="viewFlag"
                              :options="choseOptions"
                              v-model="modalInfo[item.code]"
                              >
                    <option disabled>=={{item.name}}==</option>
                    <option v-bind:key="option.key" v-for="option in item.options"
                            v-bind:value="option.key"
                            >
                      {{option.value}}
                    </option>
                  </vue-chosen>
                </div>
                <!--后台服务请求查询获得下拉选项-->
                <div :key="item.id"
                     v-else-if="item.viewType ==='remoteOption' "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--下拉框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true"  class="font-error">* </span>{{item.name}}</label>
                  <vue-chosen type="text" class="form-control"
                              v-bind:disabled="viewFlag"
                              :options="choseOptions"
                              v-model="modalInfo[item.code]"
                              >
                    <option disabled>=={{item.name}}==</option>
                    <option v-bind:key="option.code" v-for="option in item.options"
                            v-bind:value="option.code"
                            >
                      {{option.name}}
                    </option>
                  </vue-chosen>
                </div>
                <!--后台服务请求查询获得下拉选项-->
                <div :key="item.id"
                     v-else-if="item.viewType ==='remoteMultiOption'"

                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--下拉框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <vue-chosen type="text" class="form-control"
                              multiple
                              v-bind:disabled="viewFlag"
                              :options="multipleChoseOptions"
                              v-model="modalInfo[item.code]"
                              >
                    <option disabled>=={{item.name}}==</option>
                    <option v-bind:key="option.code" v-for="option in item.options"
                            v-bind:value="option.code"
                            >
                      {{option.name}}
                    </option>
                  </vue-chosen>
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='time'"
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--下拉框-->
                  <label class="control-label"><span v-if="modalExtraInfo[item.code].required === true" class="font-error">* </span>{{item.name}}</label>
                  <input type="text" class="form-control icondate"
                         v-bind:disabled="viewFlag"
                         v-bind:placeholder="item.name" style="margin-bottom:10px;"
                         v-bind:value="modalInfo[item.code]|dateFilter"
                         v-on:input="modalInfo[item.code] = $event.target.value">
                </div>
                <!--行模块-->
                <div :key="item.id"
                v-else-if="item.viewType ==='switch'"
                  class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label class="control-label">{{item.name}}</label>
                  <!--行模块：内容-->
                  <div class="clearfix base-form-vertical-lists">
                    <div class="clearfix base-form-vertical-list row">
                      <div class="col-lg-6 col-md-6  col-sm-12 col-xs-12">
                        <div class="switch-inline" style="padding-top:5px;">
                          <input type="checkbox" v-bind:id="item.id" v-model="modalInfo[item.code]">
                          <label v-bind:for="item.id">
                            <span v-bind:key="option.key" v-for="option in item.options"
                                    v-bind:value="option.key">
                              {{option.value}}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--行模块：内容end-->
                </div>
                <!--行模块end-->
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">

          <button type="button" class="btn btn-primary"
                v-on:click="commit" >{{commitTitle}}
          </button>
          <button type="button" class="btn btn-default" v-on:click="hideModal">取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'jQuery'
import 'cabin/lib/daterangepicker/moment'
import 'cabin/lib/chosen/chosen.jquery.js'
let VueChosen = require('cabin/widgets/vueChosen/vueChosen')

export default {
  name: 'VueModal',
  inheritAttrs: false,
  props: {
    'value': {
      type: Object,
      default: () => { return {} }
    },
    'dataParamOption': {
      type: Array,
      default: () => { return [] }
    },
    'dataCommitTitle': {
      type: String,
      default: '确认'
    },
    'dataTitle': {
      type: String,
      default: ''
    },
    'dataViewFlag': {
      type: Boolean,
      default: true
    },
    'dataToggle': {
      type: Boolean,
      default: false
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
      commitTitle: '确认',
      modalTitle: '',
      modalId: guid()
    }
    let modalInfo = {
    }
    // 扩展信息
    let modalExtraInfo = {
    }

    // chose参数
    let choseOptions = {
      no_results_text: '没有找到',
      search_contains: true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
      max_selected_options: 1, // 当select为多选时，最多选择个数
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
      modalInfo: modalInfo,
      modalExtraInfo: modalExtraInfo,
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
    this.modalInfo = {}
    this.modalExtraInfo = {}
    for (let obj of this.paramOption) {
      if (obj.viewType.indexOf('Multi') > 0 || obj.default instanceof Array) {
        Vue.$set(this.modalInfo, obj.code, [])
      } else {
        if (obj.default !== null && typeof obj.default !== 'undefined') {
          Vue.$set(this.modalInfo, obj.code, obj.default)
        } else {
          Vue.$set(this.modalInfo, obj.code, {})
        }
      }
      // 检查字段是否必选字段
      let conditionsStr = (obj.validate || '')
      let startIndex = conditionsStr.indexOf('|')
      let conditionParam = []

      if (startIndex !== -1) {
        conditionParam = conditionsStr.split('|')
      } else {
        conditionParam[0] = conditionsStr
      }

      this.modalExtraInfo[obj.code] = {}
      for (let conditionValue of conditionParam) {
        if (conditionValue === 'required') {
          Vue.$set(this.modalExtraInfo[obj.code], 'required', true)
        }
      }

    }
  },
  mounted () {
    let modalId = this.defaultParams.modalId
    $('#' + modalId).modal('hide')
  },
  methods: {
    // 重置参数默认值
    reset () {
      let Vue = this
      // 绑定对象初始化
      for (let obj of this.paramOption) {
        if (obj.viewType.indexOf('Multi') > 0 || obj.default instanceof Array) {
          Vue.$set(this.modalInfo, obj.code, [])
        } else {
          if (obj.default !== null && typeof obj.default !== 'undefined') {
            Vue.$set(this.modalInfo, obj.code, obj.default)
          } else {
            Vue.$set(this.modalInfo, obj.code, {})
          }
        }
      }
    },
    // 获取modal id
    getModalId () {
      this.$emit('data-modal-id', this.modalInfo)
      return this.modalId
    },
    // 表单提交
    commit () {
      // this.$emit('update:dataToggle', false)
      this.$emit('data-commit', this.modalInfo)
    },
    // 显示弹窗
    showModal () {
      $('#' + this.modalId).modal('show')
    },
    // 隐藏弹窗
    hideModal () {
      $('#' + this.modalId).modal('hide')
      this.$emit('update:dataToggle', false)
    },
    // 触发弹窗
    toggleModal () {
      $('#' + this.modalId).modal('toggle')
    }

  },
  computed: {
    modalId () {
      return this.defaultParams.modalId
    },
    viewFlag () {
      return this.dataViewFlag
    },
    commitTitle () {
      if (this.dataCommitTitle != null && typeof this.dataCommitTitle !== 'undefined') {
        return this.dataCommitTitle
      } else {
        return this.defaultParams.commitTitle
      }
    },
    modalTitle () {
      if (this.dataTitle != null && typeof this.dataTitle !== 'undefined') {
        return this.dataTitle
      } else {
        return this.defaultParams.modalTitle
      }
    },
    paramOption () {
      let tempItem = this.dataParamOption
      return tempItem
    }

  },
  components: {
    VueChosen
  },
  filters: {
    /**
       * 时间格式化
       */
    dateFilter (value) {
      if (value == null || typeof value === 'undefined' || value === '') {
        return ''
      }
      var date = moment(value).format('YYYY-MM-DD HH:mm:ss')
      return date
    }
  },
  watch: {
    // 显示隐藏modal
    dataToggle: function (val) {
      console.log('dataToggle test:' + val)
      if (val === true) {
        $('#' + this.modalId).modal('show')
      } else {
        $('#' + this.modalId).modal('hide')
      }
    },
    value: function (val) {
      var modalInfo = this.modalInfo
      let Vue = this
      // 删除旧属性
      for (let index in modalInfo) {
        Vue.$delete(this.modalInfo, index)
      }
      // 增加新属性
      for (let index in val) {
        Vue.$set(this.modalInfo, index, val[index])
      }
    }
  }

}
</script>

<style scoped>

</style>
