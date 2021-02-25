import Vue from 'vue'
import Vuex from 'vuex'

const Web3 = require('web3');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: '',
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    }
  },
  mutations: {
    setAddress(state: any, address: string): void {
      state.address = address
    }
  },
  actions: {
    setAddress({ commit }, address: string): void {
      commit('setAddress', address);
    },
    getWeb3(): Promise<any> {
      return new Promise(function (resolve, reject) {
        const web3js = window.ethereum
        if (typeof web3js !== 'undefined') {
          const web3 = new Web3(web3js)
          const data = {
            web3: web3,
            ethereum: web3js
          }
          resolve(data);
        } else {
          reject(new Error('Unable to connect to Metamask'));
        }
      })
    }
  },
  modules: {
  }
})
