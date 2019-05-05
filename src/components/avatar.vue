<template>
  <div class="avatar" :class="cls" ref="avatar">
    <img src="~assets/images/avatar.jpg" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cls: []
      }
    },
    mounted() {
      var avatarNode = this.$refs.avatar;
      if (avatarNode.hasAttribute("circle")) {
        if (this.cls.indexOf("circle") == -1) {
          this.cls.push("circle");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    overflow: hidden;
    width: vw(100);
    height: vw(100);
    position: relative;
    &.circle {
      border-radius: 50%;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: 100%;
    }
  }
</style>
