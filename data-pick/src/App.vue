<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <vue-modal data-Commit-Title="提交" data-Title="哈哈,测试"
               data-Modal-Flag = "1"  >
    </vue-modal>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import DatePick from './components/DatePick'
import VueModal from './components/VueModal'

export default {
  name: 'App',
  components: {
    DatePick,
    VueModal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
