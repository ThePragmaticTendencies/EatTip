import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import CookBook from './components/CookBook.vue'
import RabbitKate from './components/RabbitKate.vue'
import JsWorkers from './components/JsWorkers.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/cookbook', component: CookBook },
    { path: '/rabbit', component: RabbitKate },
    { path: '/jsworkers', component: JsWorkers }
  ]
})

import store from './store'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
