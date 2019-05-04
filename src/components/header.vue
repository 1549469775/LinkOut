<template>
  <header>
    <div v-if="back_path" class="back" @click="goBack()"></div>
    <transition name="bounce">
      <div class="center">{{title_name}}</div>
    </transition>
  </header>
</template>
<script>
  export default {
    props: ["path", "name"],
    data() {
      return {

      }
    },
    computed: {
      back_path() {
        return this.path;
      },
      title_name() {
        return this.name;
      }
    },
    methods: {
      goBack() {
        this.$router.replace(this.back_path);
      },
    },
  }
</script>
<style lang="scss" scoped>
  header {
    position: relative;
    overflow: hidden;
    height: calc(#{vw(100)} - 1px);
    line-height: calc(#{vw(100)} - 1px);
    background: transparent;
    border-bottom: 1px solid #dad9d9;
    color: #000;
    .back {
      position: absolute;
      top: 0;
      height: vw(40);
      width: vw(40);
      //告诉加载器他是一个模块而不是相对路径
      background-image: url("~assets/images/back.png");
      //内容区域才有背景图，padding没有
      background-origin: content-box;
      background-size: contain;
      background-repeat: no-repeat;
      padding: vw(30);
    }
    .center {
      height: 100%;
      text-align: center;
      font-size: vw(40);
      font-weight: bold;
    }
  }

  .bounce-enter-active,
  .bounce-leave-active {
    transition: opacity 0.5s;
  }
  .bounce-enter, .bounce-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

