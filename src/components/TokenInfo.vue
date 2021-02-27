<template>
  <div class="token-info">
    <h1>My tokens</h1>
    <div>
      <p v-html="contractInfo"></p>
      <TokenSlider :tokens="tokensArray" />
    </div>
  </div>
</template>

<script lang="ts">
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
  tokensArray: Array<any> | null = null;
  tokenIds: Array<number> | null = null; 

  mounted () {
    this.setContractInfo();
    this.getTokens();
  }

  setContractInfo (): void {
    this.contractInfo = `Tokens at <strong>${contractAddress.address}</strong>`
  }
  
  async getTokens (): Promise<void> {
      console.log(this.tokens);
      if (!this.tokens) {
        try {
          const { web3 } = await this.getWeb3();
          const contract = new web3.eth.Contract(contractABI, contractAddress.address);

          contract.getPastEvents('TransferSingle', { fromBlock: 0x0, toBlock: 'latest' }, async (error: any, result: Array<any>) => {
            if (!error) {
              const ownTransactions = result.filter((el: any) => el.returnValues.to.toLowerCase() === this.address.toLowerCase());
              this.tokenIds = ownTransactions.map((el: any) => el.returnValues.id);

              let tokenPromises = [];

              for (let i = 0; i < this.tokenIds.length; i++) {
                const tokenURI = await contract.methods.uri(i).call({ from: this.address });
                const tokenMetadata = await axios.get(tokenURI);
                tokenPromises.push(tokenMetadata.data);
              }

              Promise.all(tokenPromises)
                .then((res: any) => {
                  const tokens = res.map((el: any) => el.data);
                  this.tokensArray = tokens;
                  this.setTokens(tokens);
                })
                .catch((error: any) => {
                  console.log(error);
                })

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
