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
                  title="Create Token"
                  active>
                  <div v-if="address">
                    <b-form-select v-model="selectedTokenType" :options="tokenTypeOptions" class="mt-5"></b-form-select>
                    <b-form-select v-model="selectedNetwork" :options="networkOptions" class="mt-5"></b-form-select>
                    <b-button @click="createToken" class="mt-5" :style="creatingToken ? 'padding-bottom: 0.7em;' : ''">
                      <p v-if="!creatingToken" class="mb-0">
                        Create Token
                      </p>
                      <b-spinner v-if="creatingToken" small variant="light"></b-spinner>
                    </b-button>
                    <b-alert :show="creatingToken" class="mt-3">
                      It may take a few moments until the transaction is successfully finished
                    </b-alert>
                    <b-alert v-for="(createdToken, i) in createdTokens" :key="i" :show="7" @dismissed="createdTokens=[]" variant="success" class="mt-3">
                      <p>
                        <strong>Contract Address:</strong> {{ createdToken.events.TransferSingle.address }}<br>
                        <strong>Transaction Hash:</strong> {{ createdToken.events.TransferSingle.transactionHash }}<br>
                        <strong>Token ID:</strong> {{ createdToken.events.TransferSingle.returnValues.id }}
                      </p>
                    </b-alert>
                  </div>
                  <div v-else>
                    Please connect <a :href="metamaskLink" target="_blank">Metamask</a> to be able to see more information.
                  </div>
                </b-tab>
                <b-tab 
                  title="My tokens" 
                  lazy
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
import { Component, Vue, VModel } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import TokenInfo from '@/components/TokenInfo.vue';
import firebase from 'firebase/app'
import TokenTypes from '@/token-types'
import { BvOption, Transaction, ContractEvent } from '@/shared/custom-types/imports';

const { DIGITAL_ART, MUSIC, CERTIFICATIONS } = TokenTypes;

@Component({
  components: {
    TokenInfo,
  }
})
export default class NFTMainComponent extends Vue {
  @State(state => state.address) address: any;
  @Action('getWeb3') getWeb3!: () => Promise<any>;
  @Action('setAddress') setAddress!: (address: string) => void;
  
  creatingToken: boolean = false;
  metamaskLink: string = 'https://metamask.io/'
  selectedNetwork: string | null = null;
  selectedTokenType: number | null = null;
  createdTokens: Array<any> = [];

  networkOptions: Array<BvOption> = [
    { value: null, text: 'Please select a network to create your NFT in' },
    { value: 'ethereum-mainnet', text: 'Ethereum Mainnet' },
    { value: 'goerli', text: 'Goerli Testnet' },
    { value: 'xdai', text: 'xDai' }
  ];

  tokenTypeOptions: Array<BvOption> = [
    { value: null, text: 'Please select a type of token' },
    { value: DIGITAL_ART, text: 'Digital Art' },
    { value: MUSIC, text: 'Music' },
    { value: CERTIFICATIONS, text: 'Certifications and Licenses' }
  ];

  activateTab(newIndex: number, prevIndex: number, bvEvent: Event): void {
    if (newIndex == 3 && !this.address) {
      bvEvent.preventDefault();
      this.connectWallet()
    }
  }

  async connectWallet (): Promise<any> {
    try {
      const { ethereum } = await this.getWeb3();
      const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accountData[0];
      this.setAddress(account);    
    } catch (error) {
      console.log(error);
    }
  }

  async createToken (): Promise<any> {
    if (typeof this.selectedNetwork === 'string' && typeof this.selectedTokenType === 'number') {
      this.creatingToken = true;
      try {
        const { web3, ethereum } = await this.getWeb3();
        const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accountData[0];
        const contractABI = require(`@/contracts/${this.selectedNetwork}/ABI.js`),
              contractAddress = require(`@/contracts/${this.selectedNetwork}/address.js`);
        const contract = new web3.eth.Contract(contractABI.default, contractAddress.default.address);
        console.log(contract);


        firebase.auth().signInAnonymously()
          .then(async () => {
            contract.getPastEvents('TransferSingle', { fromBlock: 0x0, toBlock: 'latest' }, async (error: any, result: Array<ContractEvent>) => {
              if (!error) {
                const ownEvents = result.filter((el: ContractEvent) => el.returnValues.to.toLowerCase() === this.address.toLowerCase());
                const tokenTypeEvents = ownEvents.filter((el: ContractEvent) => el.returnValues.id.charAt(0) === this.selectedTokenType?.toString() && el.returnValues.id.length === 14);
                
                const amount = tokenTypeEvents.length + 1;
                let tokenId: any = `${this.selectedTokenType}${amount.toString().padStart(13, '0')}`;
                tokenId = parseInt(tokenId);
                const mint = await contract.methods.mint(account, tokenId, 1, []).send({ from: account });
                this.createdTokens.push(mint);

                this.$bvModal.msgBoxOk('The token was created successfully!', {
                  title: 'Success',
                  hideBackdrop: true,
                  buttonSize: 'sm',
                  centered: true,
                  okVariant: 'outline-success'
                });
                
                this.creatingToken = false;
              } else {
                console.log(error)
                this.creatingToken = false;
              }
            })
          })
          .catch((error) => {
            this.creatingToken = false;
          })
      } catch (error) {
        console.log(error);
        this.creatingToken = false;
      }
    } else {
      this.$bvModal.msgBoxOk('Please complete the token information', {
        hideBackdrop: true,
        buttonSize: 'sm',
        centered: true,
        okVariant: 'outline-danger'
      });
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
