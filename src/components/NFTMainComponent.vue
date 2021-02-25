<template>
  <div class="nfts-main-component">
      <div class="nfts-container">
          <b-container>
            <b-card no-body>
              <b-tabs card>
                <b-tab title="My tokens" active>
                  <b-card-text>
                      <div v-if="address">
                          <TokenInfo :address="address" />
                      </div>
                      <div v-else>
                          <div v-if="hasMetamask">
                            <b-button variant="dark" @click="connectWallet">Connect to Wallet</b-button>
                          </div>
                          <div v-else>
                            Please install Metamask to be able to use the app.
                          </div>
                      </div>
                  </b-card-text>
                </b-tab>
                <b-tab title="Address Info" lazy>
                  <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-container>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import TokenInfo from '@/components/TokenInfo.vue';

@Component({
  components: {
    TokenInfo,
  }
})
export default class NFTMainComponent extends Vue {
  @Prop() private hasMetamask!: boolean;
  @State address: any;
  @Action getWeb3: any;
  @Action setAddress: any;

  connectWallet (): void {
    this.getWeb3()
      .then((data: any) => {
        const { web3, ethereum } = data;
        ethereum.request({ method: 'eth_requestAccounts' })
          .then((data: any) => {
            const account = data[0];
            this.setAddress(account);
          })
      })
  }
}
</script>

<style scoped lang="scss">
    .nfts-container {margin-top: 2em;}
</style>
