<template>
  <div class="token-info">
    <h1 class="mt-3">{{ $t('myTokensTab.title') }}</h1>
    <div>
      <p class="contract-info" v-html="contractInfo"></p>
      <TokenSlider />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TokenSlider from '@/components/TokenSlider.vue'
import { Action } from 'vuex-class'
import contractAddress from '@/contracts/goerli/address'
import contractABI from '@/contracts/goerli/ABI'

@Component({
  name: 'TokenInfo',
  components: {
    TokenSlider,
  }
})
export default class TokenInfo extends Vue {
  @Prop() private address!: string;
  @Action('getWeb3') getWeb3!: () => Promise<any>;
  @Action('setTokens') setTokens!: (tokens: Array<any>) => void;
  @Action('getTokens') getTokens!: (tokenInfo: {ABI: any, address: string}) => Promise<any>;

  contractInfo: string = ''
  tokensArray: Array<any> = [];
  tokenIds: Array<number> | null = null; 

  created () {
    this.setContractInfo();
    this.getTokens({ ABI: contractABI, address: contractAddress.address });
  }

  setContractInfo () {
    this.contractInfo = `${this.$t('myTokensTab.tokensAt')} <strong>${contractAddress.address}</strong>`
  }
}
</script>

<style scoped lang="scss"></style>
