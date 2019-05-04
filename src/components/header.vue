<template>
  <header>
    <div class="back" @click="goBack()"></div>
    <div class="center">LinkOut</div>
  </header>
</template>
<script>
  export default {
    methods: {
      goBack() {
        this.$router.replace("/hhh");
      },
    },
    created() {
      console.log(123);

      console.log(this.$router);

    },
  }
</script>
<style lang="scss" scoped>
  header {
    overflow: hidden;
    height: calc(#{vw(100)} - 1px);
    line-height: calc(#{vw(100)} - 1px);
    background: transparent;
    border-bottom: 1px solid #000;
    color: #fff;
    .back {
      height: vw(50);
      width: vw(50);
      //告诉加载器他是一个模块而不是相对路径
      background-image: url("~assets/images/back.png");
      //内容区域才有背景图，padding没有
      background-origin: content-box;
      background-size: contain;
      background-repeat: no-repeat;
      padding: vw(25);
    }
    .center {
      height: 100%;
      text-align: center;
      font-size: vw(40);
    }
  }
</style>

