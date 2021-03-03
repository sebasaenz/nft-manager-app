<template>
  <div class="nfts-main-component">
      <div class="nfts-container">
          <b-container>
            <b-card no-body>
              <b-tabs
                v-model="activeTab"
                card 
                @activate-tab="activateTab"
              >
                <CreateToken />
                <MyTokens />
                <AddressInfo />

                <b-tab v-if="!isWalletConnected" :title="$t('walletTab.connect')" title-item-class="connect-wallet"></b-tab>
                <b-tab v-if="isWalletConnected" :title="$t('walletTab.isConnected')" title-item-class="wallet-connected" disabled></b-tab>
              </b-tabs>
            </b-card>
          </b-container>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, VModel } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';
  import { Tabs } from '@/shared/custom-types/imports';

  import CreateToken from '@/components/tabs/CreateToken.vue';
  import MyTokens from '@/components/tabs/MyTokens.vue';
  import AddressInfo from '@/components/tabs/AddressInfo.vue';

  import vue2Dropzone from 'vue2-dropzone';
  import "vue2-dropzone/dist/vue2Dropzone.min.css";

  @Component({
    components: {
      CreateToken,
      MyTokens,
      AddressInfo,
      vueDropzone: vue2Dropzone
    }
  })
  export default class NFTMainComponent extends Vue {
    @State(state => state.address) address: any;
    @Action('getWeb3') getWeb3!: () => Promise<any>;
    @Action('setAddress') setAddress!: (address: string) => void;
    
    isWalletConnected: boolean = false;
    tabHash: string = 'create-tokens'
    activeTab: Tabs = Tabs.CREATE_TOKENS_TAB;

    activateTab(newIndex: number, prevIndex: number, bvEvent: Event): void {
      const NUMBER_OF_TABS = 3;
      if (newIndex == NUMBER_OF_TABS && !this.address) {
        bvEvent.preventDefault();
        this.connectWallet()
      }
    }

    async created () {
      this.checkWalletConnection();
      this.checkRouteHash()
    }

    async connectWallet (): Promise<void> {
      try {
        const { ethereum } = await this.getWeb3();
        const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accountData[0];
        this.setAddress(account); 
      } catch (error) {
        console.log(error);
      }
    }

    async checkWalletConnection (): Promise<void> {
      try {
        const { ethereum } = await this.getWeb3();
        if (ethereum.isConnected()) {
          this.isWalletConnected = true;

          if (!this.address) {
            const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accountData[0];
            this.setAddress(account);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkRouteHash () {
      const currentHash = this.$router.currentRoute.hash;
      if (currentHash == '#create-token') {
        this.activeTab = Tabs.CREATE_TOKENS_TAB - 1;
      } else if (currentHash == '#my-tokens') {
        this.activeTab = Tabs.MY_TOKENS_TAB - 1;
      } else if (currentHash == '#address-info') {
        this.activeTab = Tabs.ADDRESS_INFO_TAB - 1;
      }
    }
  }
</script>

<style scoped lang="scss">
    .nfts-container {padding: 2em 0;}
    /deep/ .connect-wallet {margin-left: auto !important; background-color: #343a40; border-top-left-radius: 5px; border-top-right-radius: 5px; cursor: pointer;}
    /deep/ .connect-wallet a {color: #fff !important;}
    /deep/ .wallet-connected {margin-left: auto !important; background-color: #fff; border-top-left-radius: 5px; border-top-right-radius: 5px; cursor: pointer; border: 1px solid green; border-bottom: 0;}
    /deep/ .wallet-connected a {color: green !important;}
    /deep/ .connect-wallet .nav-link.disabled {pointer-events: auto !important; cursor: pointer !important;}
    /deep/ .form-row legend {text-align: left; padding-left: 18px !important;}
</style>
