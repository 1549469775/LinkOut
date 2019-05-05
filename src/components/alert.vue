<template>
  <transition name="bounce">
    <div class="alert" v-if="isShow">
      <div class="mask" @click="hide()"></div>
      <div class="panel">
        <div class="panel-title"></div>
        <div class="panel-container">
          <div class="wrap-text">{{option.message}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters, mapActions, mapState } from "vuex";
  export default {
    data() {
      return {
        timeID: -1
      }
    },
    computed: {
      ...mapState('alert', {
        isShow: state => state.isShow,
        option: state => state.option,
      })
    },
    watch: {
      isShow: {
        handler(show) {
          if (show && this.option.autoClose) {
            this.timeID = setTimeout(() => {
              this.hide();
            }, 3000);
          } else {
            this.timeID != -1 && clearTimeout(this.timeID);
            this.timeID = -1;
          }
        },
        // deep: true,
        immediate: true
      }
    },
    methods: {
      ...mapActions("alert", ["show", "hide"])
    }
  };
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
      border-radius: vw(10);
      overflow-x: hidden;
      .panel-container {
        padding: vw(25) vw(25);
        .wrap-text {
          text-align: center;
        }
      }
    }
  }
  .bounce-enter-active {
    animation: down-to-up 0.5s linear;
  }
  .bounce-leave-active {
    transition: opacity 0.5s;
  }
  .bounce-enter,
  .bounce-leave-to {
    opacity: 0;
  }

  @keyframes down-to-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
