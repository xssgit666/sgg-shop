import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局组件
import TypeNav from '@/components/TypeNav' // 三级联动组件
import Carsousel from '@/components/Carousel' // 轮播图组件
import Pagination from '@/components/Pagination' // 轮播图组件

// 引入MockServer.js----mock数据
import '@/mock/mockServe'

// 引入swiper样式(cnpm install --save swiper@5)这里须安装5.x版本
import 'swiper/css/swiper.css'

// 1.统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// ①.按需引入element-ui
import { MessageBox } from 'element-ui'

// 引入插件
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/1.gif' // 引入加载图片

// 引入表单校验插件
import '@/plugins/validate'

// 全局组件使用：第一个参数 组件名字  第二个参数：那个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

// ②ElementUI注册组件
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线
    Vue.prototype.$API = API // 2.所有组件可以无引用使用接口
  }
}).$mount('#app')
