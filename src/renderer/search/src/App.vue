<template>
  <div class="app">
    <input type="text" @input="onSearchChange">

    <ul v-if="searchResList.length>0">
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
      temp.push(e.target.value)
      temp.push(e.target.value)
      temp.push(e.target.value)
      temp.push(e.target.value)
      temp.push(e.target.value)
      temp.push(e.target.value)
      searchResList.value = temp
    }
    return {
      searchResList,
      onSearchChange
    }
  },
  created() {}
})
</script>

<style lang="scss">
.app {
  -webkit-app-region: drag;
  cursor: move;
  width: 100%;
  height: 80px;
  background-color: rgba(255,255,255,.2);
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
  border-radius: 10px;
  border: none;
  padding: 4px 20px 4px 20px;
  background-color: rgba(255,255,255,.5);

}

</style>
