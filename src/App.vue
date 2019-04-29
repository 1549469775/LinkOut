<template>
  <div id="app">
    <h1>Hello 好慢的萨达!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">Go to /</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
// ui表示/src/components/目录
//_表示loadsh模块
export default {
  name: "App",
  created(){
    console.log(this.$route);
    console.log(this.$store);
    
  }
};
</script>


