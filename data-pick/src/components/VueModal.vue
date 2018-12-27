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
                    v-on:click="hideModal"
              ></span>
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
                  <label class="control-label">{{item.name}}</label>
                  <input type="text" class="form-control" v-bind:placeholder="item.name"
                         v-bind:disabled="viewFlag"
                         v-model="modalInfo[item.code]"
                         />
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='number' "
                     class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <!--输入框-->
                  <label class="control-label">{{item.name}}</label>
                  <input type="number" class="form-control" v-bind:placeholder="item.name"
                         v-bind:disabled="viewFlag"
                         v-model="modalInfo[item.code]"
                         />
                </div>
                <div :key="item.id"
                     v-else-if="item.viewType ==='textarea' "
                     class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <!--输入框-->
                  <label class="control-label">{{item.name}}</label>
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
                  <!--下拉框-->
                  <label class="control-label">{{item.name}}</label>
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
                  <label class="control-label">{{item.name}}</label>
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
                  <label class="control-label">{{item.name}}</label>
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
                  <label class="control-label">{{item.name}}</label>
                  <input type="text" class="form-control icondate"
                         v-bind:disabled="viewFlag"
                         v-bind:placeholder="item.name" style="margin-bottom:10px;"
                         v-bind:value="modalInfo[item.code]|dateFilter"
                         v-on:input="modalInfo[item.code] = $event.target.value">
                </div>
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
      type: Array,
      default: []
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
      dicTypes: []
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

    console.log('defaultParams:' + JSON.stringify(defaultParams))
    return {
      modalInfo: modalInfo,
      defaultParams: defaultParams,
      choseOptions: choseOptions,
      choseOptionsNoSearch: choseOptionsNoSearch,
      multipleChoseOptions: multipleChoseOptions,
      multipleChoseOptionsNoSearch: multipleChoseOptionsNoSearch
    }
  },
  mounted () {
    // 绑定对象初始化
    for (let obj of this.paramOption) {
      this.modalInfo[obj.code] = obj.default
      if (obj.code === 'remoteMultiOption' || obj.code === 'remoteOption' || obj.code === 'options') {
        if (!(obj.default instanceof Array)) {
          this.modalInfo[obj.code] = []
        }
      }
    }

    console.log('this.modalInfo:' + JSON.stringify(this.modalInfo))
    let modalId = this.defaultParams.modalId
    $('#' + modalId).modal('hide')

    console.log('dataToggle>>>>>>' + this.dataToggle)
  },
  methods: {
    // 表单提交
    commit () {
      console.log('用户点击提交了:' + JSON.stringify(this.modalInfo))
      this.$emit('update:value', this.modalInfo)
      // this.$emit('data-commit', this.modalInfo)

      // 隐藏modal
      $('#' + this.modalId).modal('hide')
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
    // emitEventToParent (eventName, ...args) {
    //   if (!eventName) return
    //   // 为了让接口更清晰
    //   switch (eventName) {
    //     case 'toggel-modal':
    //       this.$emit(eventName, ...args)
    //       break
    //     default:
    //       throw new ReferenceError(`the event of ${eventName} is not effective`)
    //   }
    // }
  },
  computed: {
    modalId () {
      return this.defaultParams.modalId
    },
    viewFlag () {
      return this.dataViewFlag
    },
    commitTitle () {
      if (this.dataCommitTitle != null && typeof this.dataCommitTitle === 'undefined') {
        return this.dataCommitTitle
      } else {
        return this.defaultParams.commitTitle
      }
    },
    modalTitle () {
      if (this.dataTitle != null && typeof this.dataTitle === 'undefined') {
        return this.dataTitle
      } else {
        return this.defaultParams.modalTitle
      }
    },
    paramOption () {
      let tempItem = this.value
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
    }
  }

}
</script>

<style scoped>

</style>
