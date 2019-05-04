<template>
  <div id="app">
    <v-alert></v-alert>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <p @click="opeb">显示对话框</p>
  </div>
</template>

<script>
  // ui表示/src/components/目录
  //_表示loadsh模块
  import VAlert from "ui/alert.vue";

  export default {
    name: "App",
    components: {
      VAlert
    },
    methods: {
      opeb() {
        this.$store.dispatch('setAlert', true);
      }
    }
  };
</script>


