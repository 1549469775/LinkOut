<template>
  <div id="app">
    <p @click="show">dsadasd</p>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// ui表示/src/components/目录
//_表示loadsh模块
export default {
  name: "App",
  mounted() {
    console.log(this.$route.meta.keepAlive);
  },
  methods:{
    show(){
      console.log(this.$route);
    }
  }
};
</script>


