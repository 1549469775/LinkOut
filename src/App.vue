<template>
  <div id="app">
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
    created() {
      console.log(this.$route);
      console.log(this.$store);

    },
  };
</script>


