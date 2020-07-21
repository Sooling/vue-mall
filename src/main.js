import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'

// 1.引入index.js
import toast from '@components/common/toast'

import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

// 2.安装toast插件（本质上执行obj对象的install函数）
Vue.use(toast)

// 使用vue懒加载的插件
Vue.use(VueLazyLoad,{
	loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

//解决路由菜单重复点击报错的问题
//该问题属于vue-router版本问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 解决移动端300ms延迟问题
FastClick.attach(document.body)
//挂载store
//Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')