<template>
  <div id="app">
    <Alert></Alert>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  // ui表示/src/components/目录
  //_表示loadsh模块
  import Alert from "ui/alert.vue"
  export default {
    name: "App",
    components: {
      Alert
    },
  };
</script>


