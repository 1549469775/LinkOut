<template>
  <div class="home">
    <Header type="custom" path="/bar" name="大仙显灵">
      <Avatar @click.native="alert" circle slot="left"></Avatar>
    </Header>
  </div>
</template>

<script>
  import Header from "ui/header.vue"
  import Avatar from "ui/avatar.vue"
  export default {
    components: {
      Header,
      Avatar,
    },
    methods: {
      alert() {
        alert.show("游戏即将开始，请做好准备")
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
