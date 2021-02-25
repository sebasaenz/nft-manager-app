<template>
  <div class="token-info">
    <h1>Your tokens</h1>
    <div>
      {{ contractInfo }}
      <TokenSlider :tokens="tokens" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenSlider from '@/components/TokenSlider.vue'
import { Action } from 'vuex-class'
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
  @Action getWeb3: any;

  tokens: Array<any> = [];
  contractInfo: string = ''

  mounted () {
    this.getTokens();
  }

  async getTokens (): Promise<void> {
      try {
        const { web3 } = await this.getWeb3();
        const contract = new web3.eth.Contract(contractABI, contractAddress.address);
        console.log(contract);
        const data = await contract.methods.totalSupply().call({ from: this.address });

        for (let i = 1; i < 31; i++) {
            const token = await contract.methods.tokenURI(i).call({ from: this.address });
            const tokenMetadata = await axios.get(token);
            this.tokens.push(tokenMetadata);
        }

        console.log(this.tokens);
      } catch (error) {
        console.log(error);   
      }
  }
}
</script>

<style scoped lang="scss"></style>
