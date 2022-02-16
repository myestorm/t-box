<template>
  <a-layout class="app-page-layout">
    <a-layout-header class="app-page-header">
      <a-row align="center">
        <a-col flex="80px">
          <a-space>
            <a-button @click="homeHandler" :disabled="isRoot"><template #icon><icon-home /></template></a-button>
            <a-button @click="backHandler" :disabled="isRoot"><template #icon><icon-arrow-up /></template></a-button>
          </a-space>
        </a-col>
        <a-col flex="auto">
          <a-input v-model="breadcrumbs" :disabled="disabledRoot" :style="{ width:'100%' }" @press-enter="reloadHandler" />
        </a-col>
        <a-col flex="248px">
          <a-space>
            <a-button @click="reloadHandler"><template #icon><icon-refresh /></template></a-button>
            <a-input-search v-model="keyword" :style="{ width: '200px' }" :placeholder="`搜索 ${dirName}`" @clear="reloadHandler" @search="searchHandler" @press-enter="searchHandler" allow-clear />
          </a-space>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content class="app-page-content">
      <a-row class="grid-demo">
        <a-col :xs="12" :sm="6" :md="4" :lg="4" :xl="3" :xxl="2" v-for="file in list" :key="file.relativePath">
          <a-dropdown trigger="contextMenu" alignPoint :style="{ display: 'block' }">
            <div class="item" @dblclick="dbClickHandler(file)">
              <div class="icon">
                <icon-folder :size="44" :strokeWidth="2" v-if="file.isDirectory" />
                <icon-file :size="44" :strokeWidth="2" v-else />
              </div>
              <div class="name">{{ file.title }}</div>
            </div>
            <template #content>
              <a-doption @click="dbClickHandler(file)">打开</a-doption>
              <a-doption @click="drawerHandleOpen(file)">属性</a-doption>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
      <a-drawer width="40%" :visible="drawerVisible" :footer="false" @ok="drawerHandleOk" @cancel="drawerHandleCancel" unmountOnClose>
        <template #title>
          资源详细
        </template>
        <a-descriptions :data="drawerData" :title="drawerDataTitle" :column="1">
          <template #value="{ data }">
            <template v-if="data.label == '位置'">
              <a-input :default-value="data.value" />
            </template>
            <template v-else>
              {{ data.value }}
            </template>
          </template>
        </a-descriptions>
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { ref, watch, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const { parseDir } = window.$utils

export default {
  setup () {
    const store = useStore()
    const route = new useRoute()
    const router = new useRouter()
    const app = getCurrentInstance()
    const globalProperties = app.appContext.config.globalProperties

    const notification = globalProperties.$notification
    const formatSize = globalProperties.$formatSize
    const formatTime = globalProperties.$formatTime
    const formatType = globalProperties.$formatType

    const _root = 'D:/temp/electron/ele-file/src'

    const getDir = (dir) => {
      return store.dispatch('ipc/sendMessage', {
        channel: 'dir',
        msg: dir,
        options: {
          traverse: false,
          includeFile: true
        }
      })
    }

    const breadcrumbs = ref('')
    const keyword = ref('')
    const list = ref([])
    const isRoot = ref(true)
    const dirName = computed(() => {
      const arr = breadcrumbs.value.split('/')
      const last = arr.pop()
      return last || arr.pop()
    })

    const pageInit = () => {
      const rootDir = decodeURIComponent(route.params.rootDir) || _root
      isRoot.value = rootDir === _root
      breadcrumbs.value = parseDir(rootDir).join('/')
      getDir(rootDir).then(res => {
        list.value = res
      }).catch(error => {
        notification.error({ content: error })
      })
    }
    pageInit()

    watch(
      () => route.params,
      pageInit
    )

    const dbClickHandler = (info) => {
      if (info.isDirectory) {
        router.push(`/files/${encodeURIComponent(info.realPath)}`)
      }
    }

    const homeHandler = () => {
      router.push(`/files/${encodeURIComponent(_root)}`)
    }

    const backHandler = () => {
      const arr = breadcrumbs.value.split('/')
      arr.pop()
      router.push(`/files/${encodeURIComponent(arr.join('/'))}`)
    }

    const reloadHandler = () => {
      getDir(breadcrumbs.value).then(res => {
        list.value = res
      }).catch(error => {
        notification.error({ content: error })
      })
    }

    const searchHandler = () => {
      if (keyword.value) {
        store.dispatch('ipc/sendMessage', {
          channel: 'dir/search',
          msg: {
            rootDir: breadcrumbs.value, 
            keyword: keyword.value
          }
        }).then(res => {
          list.value = res
        }).catch(error => {
          notification.error({ content: error })
        })
      } else {
        reloadHandler()
      }
    }

    const disabledRoot = computed(() => {
      const _breadcrumbs = breadcrumbs.value
      const res = new RegExp(_breadcrumbs).test(_root)
      if (new RegExp(_breadcrumbs).test(_root)) {
        breadcrumbs.value = _root
        isRoot.value = true
        reloadHandler()
      }
      return res
    })

    const drawerVisible = ref(false)
    const drawerData = ref([])
    const drawerDataTitle = ref('')
    const formatDescriptions = (data) => {
      const res = []
      drawerDataTitle.value = data.title
      res.push({
        label: '位置',
        value: data.realPath
      })
      res.push({
        label: '类型',
        value: formatType(data.info.ext)
      })
      if (!data.isDirectory) {
        res.push({
          label: '大小',
          value: formatSize(data.stats.size)
        })
      }
      res.push({
        label: '创建时间',
        value: formatTime(data.stats.ctime)
      })
      res.push({
        label: '修改时间',
        value: formatTime(data.stats.mtime)
      })
      res.push({
        label: '访问时间',
        value: formatTime(data.stats.atime)
      })
      drawerData.value = res
    }
    const drawerHandleOpen = (file) => {
      drawerVisible.value = true
      formatDescriptions(file)
    }
    const drawerHandleOk = () => {
      drawerVisible.value = false
    }
    const drawerHandleCancel = () => {
      drawerVisible.value = false
    }

    return {
      root: _root,
      keyword,
      breadcrumbs,
      dirName,
      disabledRoot,
      list,
      isRoot,
      homeHandler,
      backHandler,
      dbClickHandler,
      reloadHandler,
      searchHandler,
      drawerVisible,
      drawerData,
      drawerDataTitle,
      drawerHandleOpen,
      drawerHandleOk,
      drawerHandleCancel
    }
  }
}
</script>
<style lang="scss" scoped>
.grid-demo {
  .item {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    border-radius: var(--border-radius-small);
    transition: $--transition;
    user-select: none;
    &:hover {
      background-color: var(--color-fill-1);
    }
    .icon {
      color: rgb(var(--gray-5));
    }
    .name {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
