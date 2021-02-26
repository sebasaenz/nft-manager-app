/*
* This allows the window object to be accessed without type errors
*/
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false

Vue.prototype.$ethereum = window.ethereum;
Vue.prototype.$web3 = window.web3;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCarousel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
