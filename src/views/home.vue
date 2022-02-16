<template>
  <a-layout class="app-page-layout">
    <a-layout-sider class="app-page-sider">
      <dir-tree :dirs="dirs" @treeSelected="treeSelectedHandler"></dir-tree>
    </a-layout-sider>
    <a-layout-content class="app-page-content">
      <a-table :data="tableData" :bordered="false" :pagination="false">
        <template #columns>
          <a-table-column title="名称" data-index="title"></a-table-column>
          <a-table-column title="修改日期">
            <template #cell="{ record }">
              {{formatTime(record.stats.mtime)}}
            </template>
          </a-table-column>
          <a-table-column title="类型">
            <template #cell="{ record }">
              {{formatType(record.info.ext)}}
            </template>
          </a-table-column>
          <a-table-column title="大小">
            <template #cell="{ record }">
              {{formatSize(record.stats.size)}}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import dirTree from '../components/dir-tree/index.vue'

export default {
  components: {
    dirTree
  },
  props: {
    msg: {
      type: String,
      default: 'Angle'
    }
  },
  setup () {
    const app = getCurrentInstance()
    const store = useStore()
    const globalProperties = app.appContext.config.globalProperties
    const formatTime = globalProperties.$formatTime
    const formatSize = globalProperties.$formatSize
    const formatType = globalProperties.$formatType

    const dirs = ref([])
    const tableData = ref([])

    store.dispatch('ipc/sendMessage', {
      channel: 'dir',
      msg: 'src'
    }).then(res => {
      dirs.value = res
    })

    const treeSelectedHandler = (val) => {
      store.dispatch('ipc/sendMessage', {
        channel: 'dir',
        msg: val[0],
        options: {
          traverse: false,
          includeFile: true
        }
      }).then(res => {
        tableData.value = res
      })
    }

    return {
      dirs,
      treeSelectedHandler,
      tableData,
      formatTime,
      formatSize,
      formatType
    }
  }
}
</script>
