<template>
  <div class="top-menu">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="1">文件</a-menu-item>
      <a-menu-item key="2">笔记</a-menu-item>
      <a-menu-item key="3">文档</a-menu-item>
      <a-menu-item key="4">书架</a-menu-item>
      <a-menu-item key="5">相册</a-menu-item>
      <a-menu-item key="6">音乐</a-menu-item>
      <a-menu-item key="7">电影</a-menu-item>
      <a-menu-item key="8">工具</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  setup () {}
}
</script>
<style lang="scss">
.top-menu {
  .arco-menu-horizontal .arco-menu-inner {
    padding: 0 0 8px 0;
  }
  .arco-menu-selected-label {
    bottom: -4px;
  }
  .arco-menu-horizontal .arco-menu-item:not(:first-child), .arco-menu-horizontal .arco-menu-pop:not(:first-child) {
    margin-left: 0;
  }
}
</style>
