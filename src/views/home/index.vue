<template>
  <div class="home">
    <Header type="custom" path="/bar" name="大仙显灵">
      <Avatar slot="left" circle></Avatar>
    </Header>
  </div>
</template>

<script>
  import Header from "ui/header.vue"
  import Avatar from "ui/avatar.vue"
  export default {
    components: {
      Header,
      Avatar
    }
  }
</script>

<style lang="scss" scoped>
</style>
