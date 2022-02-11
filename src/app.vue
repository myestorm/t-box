<template>
  <a-layout class="app-layout">
    <a-layout-header class="app-header">
      <top-menu></top-menu>
    </a-layout-header>
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
