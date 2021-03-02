<template>
  <div class="token-info">
    <h1 class="mt-3">{{ $t('myTokensTab.title') }}</h1>
    <div>
      <p v-html="contractInfo"></p>
      <TokenSlider :tokens="tokensArray" />
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenSlider from '@/components/TokenSlider.vue'
import { State, Action } from 'vuex-class'
import contractAddress from '@/contracts/goerli/address'
import contractABI from '@/contracts/goerli/ABI'
import axios from 'axios'

@Component({
  name: 'TokenInfo',
  components: {
    TokenSlider,
  }
})
export default class TokenInfo extends Vue {
  @Prop() private address!: string;
  @State(state => state.tokens) tokens!: string;
  @Action('getWeb3') getWeb3!: () => Promise<any>;
  @Action('setTokens') setTokens!: (tokens: Array<any>) => void;

  contractInfo: string = ''
  tokensArray: Array<any> = [];
  tokenIds: Array<number> | null = null; 

  mounted () {
    this.setContractInfo();
    this.getTokens();
  }

  setContractInfo (): void {
    this.contractInfo = `${this.$t('myTokensTab.tokensAt')} <strong>${contractAddress.address}</strong>`
  }
  
  async getTokens (): Promise<void> {
      if (!this.tokens) {
        try {
          const { web3 } = await this.getWeb3();
          const contract = new web3.eth.Contract(contractABI, contractAddress.address);

          contract.getPastEvents('TransferSingle', { fromBlock: 0x0, toBlock: 'latest' }, async (error: any, result: Array<any>) => {
            if (!error) {
              const ownTransactions = result.filter((el: any) => el.returnValues.to.toLowerCase() === this.address.toLowerCase());
              this.tokenIds = ownTransactions.map((el: any) => el.returnValues.id);

              for (let i = 0; i < this.tokenIds.length; i++) {
                let item = this.tokenIds[i];
                const tokenURI = await contract.methods.uri(item).call({ from: this.address });
                firebase.auth().signInAnonymously()
                  .then(async () => {
                    try {
                      var storageRef = firebase.storage().ref();
                      let metadataRef = storageRef.child(`token-metadata/${item}.json`);
                      let tokenMetadataURL = await metadataRef.getDownloadURL();
                      // TODO: Change it when the deployed contract has the real URI so it pulls directly from the contract
                      const tokenMetadata = await axios.get(tokenMetadataURL);

                      if (typeof tokenMetadata.data !== 'string') {
                        this.tokensArray.push(tokenMetadata.data);
                        this.tokens = JSON.stringify(this.tokensArray);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }
            } else {
              console.log(error)
            }
          })
        } catch (error) {
          console.log(error);   
        }
      } else {
        this.tokensArray = JSON.parse(this.tokens);
      }
  }
}
</script>

<style scoped lang="scss"></style>
