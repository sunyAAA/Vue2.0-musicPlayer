<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components:{
    MHeader,Tab
  },
  created(){
    this.$http.get('/api/recommend').then((res)=>{
      console.log(res.data);
    })
  }
};
</script>

<style lang="stylus" scoped>

</style>

