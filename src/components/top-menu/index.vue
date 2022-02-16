<template>
  <div class="top-menu">
    <div class="logo">
      <i />
    </div>
    <div class="header">
      <a-dropdown position="br">
        <a-button-group>
          <a-button>T-BOX</a-button>
          <a-button>
            <template #icon>
              <icon-more />
            </template>
          </a-button>
        </a-button-group>
        <template #content>
          <a-doption><template #icon><icon-settings /></template>系统设置</a-doption>
        </template>
      </a-dropdown>
    </div>
    <a-menu :default-selected-keys="['1']" :collapsed="collapsed">
      <a-menu-item v-for="(item, index) in menu" :key="index" @click="linkTo(item)">
        <template #icon>
          <t-icon :icon="item.icon" :strokeWidth="4" />
        </template>
        {{item.title}}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tIcon from '../icon/t-icon.vue'

export default {
  components: { tIcon },
  setup () {
    const router = useRouter()
    const collapsed = ref(false)
    const menu = [{
      title: '文件',
      icon: 'IconFolder',
      path: '/files'
    }, {
      title: '笔记',
      icon: 'IconFile'
    }, {
      title: '文档',
      icon: 'IconDriveFile'
    }, {
      title: '书架',
      icon: 'IconApps'
    }, {
      title: '相册',
      icon: 'IconFileImage'
    }, {
      title: '工具',
      icon: 'IconTool'
    }]
    return {
      collapsed,
      menu,
      linkTo (item) {
        console.log(item)
        if (item.path)
        router.push(item.path)
      }
    }
  }
}
</script>
<style lang="scss">
.logo {
  padding: 8px 0;
  background-color: var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary-hover);
  i {
    width: 48px;
    height: 48px;
    display: block;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-image: url(../../assets/logo.svg);
  }
}
.header {
  background-color: var(--color-secondary);
  margin-bottom: 4px;
  .arco-btn-group {
    width: 100%;
  }
  .arco-btn-group .arco-btn:first-child {
    flex: 1;
  }
}
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
