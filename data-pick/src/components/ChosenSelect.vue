<template>
  <select v-bind:id="defaultParams.modalId">
    <slot></slot>
  </select>
</template>

<script>
import 'cabin/lib/chosen/chosen.jquery.js'

export default {
  name: 'ChosenSelect',
  props: [
    'value',
    'options'
  ],
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
    let modalInfo = {
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
    console.log("what happen")
    var chosenOptions = this.chosenOptions
    var id = this.defaultParams.modalId
    $('#' + id).chosen(chosenOptions)
  },
  computed: {
    chosenOptions () {
      if (this.options != null && typeof this.options === 'undefined') {
        return this.options
      } else {
        return this.choseOptions
      }
    }

  }
}
</script>

<style scoped>

</style>
