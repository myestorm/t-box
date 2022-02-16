<template>
  <a-layout class="app-layout">
    <a-layout-sider class="app-sider">
      <top-menu></top-menu>
    </a-layout-sider>
    <a-layout-content class="app-content">
      <div class="app-box">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import TopMenu from './components/top-menu/index.vue'
export default {
  components: {
    TopMenu
  },
  setup () {
    
  }
}
</script>
