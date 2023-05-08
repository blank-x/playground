<template>
  <div class="app">
    <input type="text" @input="onSearchChange">

    <ul class="searchRes" v-if="searchResList.length>0">
      <li v-for="item in searchResList">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const searchResList = ref([])
    const onSearchChange = (e) => {
      const temp = [];
      searchResList.value = temp
      if(e.target.value){
        temp.push(e.target.value)
        temp.push(e.target.value)
        temp.push(e.target.value)
        temp.push(e.target.value)
        temp.push(e.target.value)
        temp.push(e.target.value)
      }

      window.dddd.searchResize()
    }
    return {
      searchResList,
      onSearchChange
    }
  },
  created() {}
})
</script>

<style lang="scss" scoped>
.app {
  -webkit-app-region: drag;
  cursor: move;
  width: 100%;
  min-height: 80px;
  background-color: rgba(255,255,255,.2);
  padding-bottom: 16px;
  box-sizing: border-box;
}
input{
  box-sizing: border-box;
  width: calc(100% - 32px);
  height: 48px;
  margin-top: 16px;
  margin-left: 16px;
  display: inline-block;
  -webkit-app-region: no-drag;
  font-size: 28px;
  line-height: 48px;
  outline: none;
  //border-radius: 10px;
  border: none;
  padding: 4px 20px 4px 20px;
  background-color: rgba(255,255,255,.5);

}
.searchRes{
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 10px;
  background-color: rgba(255,255,255,.6);
  -webkit-app-region: no-drag;

}
.searchRes li{
  line-height: 30px;
  padding-left: 20px;

  font-size: 20px;
}
</style>
