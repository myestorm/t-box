<template>
  <div class="tree">
    <a-tree blockNode :data="list" :default-expand-all="false" @select="selectHandler" :fieldNames="{
      key: 'realPath',
      title: 'title',
      children: 'children'
    }">
      <template #switcher-icon>
        <icon-down />
      </template>
    </a-tree>
  </div>
</template>
<script>
import { watch, h, ref } from 'vue'
import { IconFolder } from '@arco-design/web-vue/es/icon'
export default {
  props: {
    dirs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props, ctx) {
    const list = ref([])
    const traverseAddIcon = (data = []) => {
      data.map(item => {
        item.icon = () => h(IconFolder)
        if (item.children && item.children.length > 0) {
          traverseAddIcon(item.children)
        } else {
          item.switcherIcon = () => h(null)
        }
      })
      return data
    }
    list.value = traverseAddIcon(props.dirs)
    watch(() => props.dirs, (value) => {
      list.value = traverseAddIcon(value)
    })

    const selectHandler = (selectedKeys, event) => {
      ctx.emit('treeSelected', selectedKeys, event)
    }

    return {
      list,
      selectHandler
    }
  }
}
</script>
<style lang="scss" scoped>
.tree {
  padding: 0 8px;
}
</style>
