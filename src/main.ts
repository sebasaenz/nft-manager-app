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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";

import VueI18n from 'vue-i18n'
import messages from '@/locales'

const firebaseConfig = {
  apiKey: "AIzaSyB8KLEe-Po4x_K5Sow0nMtcyx55qBc941k",
  authDomain: "nfts-manager.firebaseapp.com",
  projectId: "nfts-manager",
  storageBucket: "nfts-manager.appspot.com",
  messagingSenderId: "1002248895797",
  appId: "1:1002248895797:web:0d10e0836af807727a207c",
  measurementId: "G-PGEKDWD78S"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.prototype.$ethereum = window.ethereum;
Vue.prototype.$web3 = window.web3;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCarousel);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
