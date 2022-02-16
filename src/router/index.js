import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Home from '../views/home.vue'
import About from '../views/about.vue'
import FilesList from '../views/files/list.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/files/:rootDir?', component: FilesList },
  { path: '/about', component: About },
]
const isElectron = typeof global !== 'undefined'
const router = createRouter({
  history: isElectron ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
