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
import contractAddress from '@/contracts/kudos/address'
import contractABI from '@/contracts/kudos/ABI'
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

  mounted () {
    this.setContractInfo();
    this.getTokens();
  }

  setContractInfo (): void {
    this.contractInfo = `Tokens at <strong>${contractAddress.address}</strong>`
  }
  
  async getTokens (): Promise<void> {
      if (!this.tokens) {
        try {
          const { web3 } = await this.getWeb3();
          const contract = new web3.eth.Contract(contractABI, contractAddress.address);
          const data = await contract.methods.totalSupply().call({ from: this.address });

          let tokenPromises = [];
            
          for (let i = 1; i < 31; i++) {
            const token = await contract.methods.tokenURI(i).call({ from: this.address });
            const tokenMetadata = axios.get(token);
            tokenPromises.push(tokenMetadata);
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
