import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import axios from 'axios'
const Web3 = require('web3');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: localStorage.getItem('nfts_address') || '',
    tokens: localStorage.getItem('nfts_tokens') 
              ? JSON.parse(((localStorage).getItem('nfts_tokens')) as string) 
              : ''
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
    },
    async getTokens({ commit }, tokenInfo: { ABI: any, address: string }) {
      try {
        const { web3 } = await this.dispatch('getWeb3');
        const { ABI, address } = tokenInfo;
        const contract = new web3.eth.Contract(ABI, address);
        
        contract.getPastEvents('TransferSingle', { fromBlock: 0x0, toBlock: 'latest' }, async (error: any, result: Array<any>) => {
          if (!error) {
            const ownTransactions = result.filter((el: any) => el.returnValues.to.toLowerCase() === this.state.address.toLowerCase());
            const tokenIds = ownTransactions.map((el: any) => el.returnValues.id);
            try {
              await firebase.auth().signInAnonymously()
              
              let tokenPromises = []
              
              for (let i = 0; i < tokenIds.length; i++) {
                const tokenId = tokenIds[i];

                try {
                  var storageRef = firebase.storage().ref();
                  let metadataRef = storageRef.child(`token-metadata/${tokenId}.json`);
                  let tokenMetadataURL = await metadataRef.getDownloadURL();
                  // TODO: Change it when the deployed contract has the real URI so it pulls directly from the contract
                  const tokenMetadata = axios.get(tokenMetadataURL);
                  tokenPromises.push(tokenMetadata);

                  } catch (error) {
                    console.log(error);
                  }
                }

                Promise.all(tokenPromises)
                  .then(tokens => {
                    console.log(tokens);
                    let wellFormedTokens = tokens.filter(t => typeof t.data !== 'string').map(t => t.data);

                    commit('SET_TOKENS', wellFormedTokens);

                    localStorage.setItem('nfts_tokens', JSON.stringify(wellFormedTokens));
                  })
                  .catch(error => {
                    console.log(error)
                  })

              } catch (error) {
                console.log(error);
              }
            } else {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error)
        }
    },
    getAddress({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { web3, ethereum } = await this.dispatch('getWeb3');
          const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accountData[0];
          resolve(account);
        } catch (error) {
          reject(error);
        }
      })
    }
  },
  modules: {
  }
})
