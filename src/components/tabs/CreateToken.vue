<template>
  <div class="tab-create-token">
    <b-tab 
      :title="$t('createTokenTab.tabName')"
      active>
      <div v-if="address" :style="{ 'margin': '0 auto', 'max-width': '768px' }">
        <h1 class="mt-3">{{ $t('createTokenTab.title') }}</h1>

        <b-form-select
            v-model="selectedTokenType"
            :options="tokenTypeOptions"
            class="mt-5">
        </b-form-select>

        <b-form-input
            v-if="selectedTokenType && selectedTokenType != CERTIFICATIONS"
            v-model="title"
            :placeholder="$t('createTokenTab.tokenTitle')"
            class="mt-5">
        </b-form-input>

        <b-form-input 
            v-if="selectedTokenType && selectedTokenType != CERTIFICATIONS"
            v-model="author"
            :placeholder="$t('createTokenTab.author')"
            class="mt-3">
        </b-form-input>

        <b-form-textarea
            v-if="selectedTokenType !== null"
            id="textarea"
            v-model="description"
            :placeholder="$t('createTokenTab.description')"
            rows="3"
            max-rows="6"
            class="mt-3"
        ></b-form-textarea>

        <vue-dropzone 
            id="dropzone"
            ref="dropzone"
            v-if="selectedTokenType !== null"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            @vdropzone-file-added="startProcessing"
            @vdropzone-complete="afterComplete"
            class="mt-3">
          <div class="dropzone-custom-content">
            <h3 class="dropzone-custom-title">{{ $t('createTokenTab.addMultimedia') }}</h3>
            <div class="dropzone-subtitle">{{ $t('createTokenTab.addMultimediaOr') }}</div>
          </div>
        </vue-dropzone>

        <b-form-select
            v-model="selectedNetwork"
            :options="networkOptions"
            class="mt-5">
        </b-form-select>

        <button 
          @click="createToken"
          :class="['btn-cool', 'mt-5', creatingToken || loadingFile ? 'loading' : '']"
          :style="creatingToken ? 'padding-bottom: 0.7em;' : ''"
          :disabled="loadingFile">
            <p v-if="!creatingToken && !loadingFile" class="mb-0">
            {{ $t('createTokenTab.button') }}
            </p>
            <b-spinner v-if="creatingToken || loadingFile" small variant="light"></b-spinner>
        </button>

        <b-alert :show="creatingToken" class="mt-3">
            {{ $t('createTokenTab.itMayTakeAMoment') }}
        </b-alert>

        <b-alert v-for="(createdToken, i) in createdTokens" :key="i" :show="7" @dismissed="createdTokens.pop()" variant="success" class="mt-3">
            <p>
            <strong>{{ $t('createTokenTab.contractAddress') }}:</strong> {{ createdToken.events.TransferSingle.address }}<br>
            <strong>{{ $t('createTokenTab.transactionHash') }}:</strong> {{ createdToken.events.TransferSingle.transactionHash }}<br>
            <strong>{{ $t('createTokenTab.tokenId') }}:</strong> {{ createdToken.events.TransferSingle.returnValues.id }}
            </p>
        </b-alert>
      </div>
      <div v-else>
        {{ $t('global.connectMetamask1') }} <a :href="metamaskLink" target="_blank">Metamask</a> {{ $t('global.connectMetamask2') }}
      </div>
    </b-tab>
  </div>   
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';
  import firebase from 'firebase/app'
  import TokenConstants from '@/token-types'
  import { ContractEvent } from '@/shared/custom-types/imports';
  import vue2Dropzone from 'vue2-dropzone';
  import "vue2-dropzone/dist/vue2Dropzone.min.css";
  let uuid = require("uuid");

  const { DIGITAL_ART, MUSIC, CERTIFICATIONS } = TokenConstants;

  @Component({
    components: {
      vueDropzone: vue2Dropzone
    }
  })
  export default class CreateToken extends Vue {
    @Action('getWeb3') getWeb3!: () => Promise<any>;
    @Action('setAddress') setAddress!: (address: string) => void;
    @Action('getTokens') getTokens!: (tokenInfo: {ABI: any, address: string}) => Promise<any>;
    
    DIGITAL_ART: number = DIGITAL_ART;
    MUSIC: number = MUSIC;
    CERTIFICATIONS: number = CERTIFICATIONS;
    
    metamaskLink: string = 'https://metamask.io/'
    creatingToken: boolean = false;
    selectedNetwork: string | null = null;
    selectedTokenType: number | null = null;
    createdTokens: Array<any> = [];
    isWalletConnected: boolean = false;
    $refs!: {
        dropzone: any
    };
    loadingFile: boolean = false;
    address: string = '';

    dropzoneOptions: any = {
      url: "https://httpbin.org/post",
      thumbnailWidth: 200,
      addRemoveLinks: true,
      maxFiles: 1
    }
    title: string = '';
    author: string = '';
    description: string = '';
    file: any = null;
    mediaName: string = '';
    

    networkOptions: Array<any> = [
      { value: null, text: this.$t('createTokenTab.selectNetwork') },
      { value: 'goerli', text: this.$t('createTokenTab.networkOptions[0]') }
    ];

    tokenTypeOptions: Array<any> = [
      { value: null, text: this.$t('createTokenTab.selectTokenType') },
      { value: DIGITAL_ART, text: this.$t('createTokenTab.tokenTypeOptions[0]') },
      { value: MUSIC, text: this.$t('createTokenTab.tokenTypeOptions[1]') },
      { value: CERTIFICATIONS, text: this.$t('createTokenTab.tokenTypeOptions[2]') }
    ];

    created () {

    }

    async createToken (): Promise<void> {
      if (typeof this.selectedNetwork === 'string' && typeof this.selectedTokenType === 'number') {
        this.creatingToken = true;
        try {
          
          const mediaURL = await this.uploadMedia();
          let metadataObject: any;

          if (mediaURL == false) {
            this.$bvModal.msgBoxOk('There was an unexpected error. Please try again', {
              hideBackdrop: true,
              buttonSize: 'sm',
              centered: true,
              okVariant: 'outline-danger'
            });
            this.creatingToken = false;

            return;
          } else if (typeof mediaURL == 'string') {
            metadataObject = this.createMetadataObject(mediaURL)
          }

          const { web3, ethereum } = await this.getWeb3();
          const accountData = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accountData[0];
          const contractABI = require(`@/contracts/${this.selectedNetwork}/ABI.js`),
                contractAddress = require(`@/contracts/${this.selectedNetwork}/address.js`);
          const contract = new web3.eth.Contract(contractABI.default, contractAddress.default.address);

          contract.getPastEvents('TransferSingle', { fromBlock: 0x0, toBlock: 'latest' }, async (error: any, result: Array<ContractEvent>) => {
            if (!error) {
              const ownEvents = result.filter((el: ContractEvent) => el.returnValues.to.toLowerCase() === this.address.toLowerCase());
              const tokenTypeEvents = ownEvents.filter((el: ContractEvent) => el.returnValues.id.charAt(0) === this.selectedTokenType?.toString());
                
              const amount = tokenTypeEvents.length + 1;
              let tokenId: any = `${this.selectedTokenType}${amount.toString().padStart(13, '0')}`;
              tokenId = parseInt(tokenId);

              await this.uploadMetadata(metadataObject, tokenId);
              
              try {
                const mint = await contract.methods.mint(account, tokenId, 1, []).send({ from: account });
                this.createdTokens.push(mint);

                this.$bvModal.msgBoxOk('The token was created successfully!', {
                  title: 'Success',
                  hideBackdrop: true,
                  buttonSize: 'sm',
                  centered: true,
                  okVariant: 'outline-success'
                });
                this.$refs.dropzone.removeFile(this.file);
                this.mediaName = ''
                this.creatingToken = false;
                this.getTokens({ ABI: contractABI, address: contractAddress.address });
              } catch (error) {
                let storageRef = firebase.storage().ref();
                let metadataRef = storageRef.child(`token-metadata/${tokenId}.png`);
                let imageRef = storageRef.child(`images/${this.mediaName}.png`);

                await metadataRef.delete();
                await imageRef.delete();

                this.mediaName = '';
                this.creatingToken = false;
              }
            } else {
              console.log(error)
              this.creatingToken = false;
            }
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

    createMetadataObject (mediaURL: string): any {
      let obj: any = {};

      if (this.selectedTokenType) {
        obj.type = this.selectedTokenType;
      }

      if (this.title && this.author) {
        obj.title = this.title;
        obj.author = this.author;
      }

      if (this.description) {
        obj.description = this.description;
      }

      obj.url = mediaURL;

      return obj;
    }

    async uploadMedia (): Promise<string | boolean> {
      return await firebase.auth().signInAnonymously()
        .then(async () => {
            let mediaName = uuid.v1();
            this.mediaName = mediaName;

            try {
              let metadata = {
                contentType: "image/png"
              };
              let storageRef = firebase.storage().ref();
              let imageRef = storageRef.child(`images/${mediaName}.png`);
              await imageRef.put(this.file, metadata);
              let downloadURL = await imageRef.getDownloadURL();

              return downloadURL;

            } catch (error) {
              return false;
            }
        })
        .catch((error) => {
            return false;
        });
    }

    async uploadMetadata (metadataObject: any, id: string): Promise<boolean> {
      firebase.auth().signInAnonymously()
        .then(async () => {
            try {
              var contentType = {
                contentType: "application/json"
              };
              let storageRef = firebase.storage().ref();
              let jsonRef = storageRef.child(`token-metadata/${id}.json`);
              const metadataJson = JSON.stringify(metadataObject);
              const jsonBlob = new Blob([metadataJson], { type: 'application/json' });
              await jsonRef.put(jsonBlob, contentType);
              let metadataURL = await jsonRef.getDownloadURL();
              console.log(metadataURL)

              return true;

            } catch (error) {
              return false;
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return false;
        });

      return false;
    }

    startProcessing (file: File) {
      this.loadingFile = true;
    }

    afterComplete () {
      this.loadingFile = false;
      this.file = this.$refs.dropzone.getAcceptedFiles()[0];
    }
  }
</script>

<style scoped lang="scss">
  #dropzone {border: 2px solid #00b782;}
  .dropzone-custom-title {font-size: 1.25em; margin-top: 0; color: #00b782;}
  .dropzone-subtitle {color: #314b5f;}
  .btn-cool {max-width: fit-content;}
  .btn-cool.loading {background: #6c757d;}
  .btn-cool.loading:hover:before {background: #6c757d !important;}
  .btn-cool.loading span {position: static; background: #6c757d; display: block; transform: none; animation: .75s linear infinite spinner-border;}
</style>