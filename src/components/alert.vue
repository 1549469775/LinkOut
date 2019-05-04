<template>
  <transition name="bounce">
    <div class="alert" v-if="isAlert">
      <div class="mask" @click="close"></div>
      <div class="panel">
        <div class="panel-title"></div>
        <div class="panel-container">
          <div class="wrap-text">
            关闭对话狂
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapGetters(['isAlert'])
    },
    methods: {
      ...mapActions(['setAlert']),
      close() {
        this.$store.dispatch('setAlert', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 9999999999999999;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #2e2e2e59;
    }
    .panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: #000;
      background-color: #fff;
      width: vw(600);
      // height: vw(600);
      border-radius: vw(20);
      overflow-x: hidden;
      .panel-container {
        padding: vw(25) vw(25);
        .wrap-text {
          text-align: center;
        }
      }
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
