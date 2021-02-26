import Vue from 'vue'
import Vuex from 'vuex'

const Web3 = require('web3');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: localStorage.getItem('nfts_address') || '',
    tokens: localStorage.getItem('nfts_tokens') || ''
  },
  mutations: {
    SET_ADDRESS(state: any, address: string): void {
      state.address = address;
      localStorage.setItem('nfts_address', address);
    },
    SET_TOKENS(state: any, tokens: Array<any>): void {
      state.tokens = tokens;
      localStorage.setItem('nfts_tokens', JSON.stringify(tokens));
    }
  },
  actions: {
    setAddress({ commit }, address: string): void {
      commit('SET_ADDRESS', address);
    },
    setTokens({ commit }, tokens: Array<any>): void {
      commit('SET_TOKENS', tokens);
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
