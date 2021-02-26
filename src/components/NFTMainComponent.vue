<template>
  <div class="nfts-main-component">
      <div class="nfts-container">
          <b-container>
            <b-card no-body>
              <b-tabs 
                card 
                @activate-tab="activateTab"
              >
                <b-tab 
                  title="My tokens" 
                  active
                >
                  <b-card-text 
                    :style="{ 
                      'overflow': 'scroll', 
                      'max-height': 'calc(100vh - 280px)'
                    }"
                  >
                    <div v-if="address">
                      <TokenInfo :address="address" />
                    </div>
                    <div v-else>
                      Please connect <a :href="metamaskLink" target="_blank">Metamask <b-icon icon="box-arrow-up-right"></b-icon></a>
                       to be able to see more information.
                    </div>
                  </b-card-text>
                </b-tab>
                <b-tab 
                  title="Address Info" 
                  lazy>
                  <div v-if="address">
                    Address: <strong>{{ address }}</strong>
                  </div>
                  <div v-else>
                    Please connect <a :href="metamaskLink" target="_blank">Metamask</a> to be able to see more information.
                  </div>
                </b-tab>
                <b-tab v-if="!address" title="Connect Wallet" title-item-class="connect-wallet"></b-tab>
                <b-tab v-if="address" title="Wallet Connected" title-item-class="wallet-connected" disabled></b-tab>
              </b-tabs>
            </b-card>
          </b-container>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import TokenInfo from '@/components/TokenInfo.vue';

@Component({
  components: {
    TokenInfo,
  }
})
export default class NFTMainComponent extends Vue {
  @State(state => state.address) address: any;
  @Action('getWeb3') getWeb3!: () => Promise<any>;
  @Action('setAddress') setAddress!: (address: string) => void;

  metamaskLink: string = 'https://metamask.io/'

  activateTab(newIndex: number, prevIndex: number, bvEvent: Event): void {
    if (newIndex == 2 && !this.address) {
      bvEvent.preventDefault();
      this.connectWallet()
    }
  }

  async connectWallet (): Promise<any> {
    console.log('something')
    try {
      const { ethereum } = await this.getWeb3();
      const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accountData[0];
      this.setAddress(account);    
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped lang="scss">
    .nfts-container {padding-top: 2em;}
    /deep/ .connect-wallet {margin-left: auto !important; background-color: #343a40; border-top-left-radius: 5px; border-top-right-radius: 5px; cursor: pointer;}
    /deep/ .connect-wallet a {color: #fff !important;}
    /deep/ .wallet-connected {margin-left: auto !important; background-color: #fff; border-top-left-radius: 5px; border-top-right-radius: 5px; cursor: pointer; border: 1px solid green; border-bottom: 0;}
    /deep/ .wallet-connected a {color: green !important;}
    /deep/ .connect-wallet .nav-link.disabled {pointer-events: auto !important; cursor: pointer !important;}
</style>
