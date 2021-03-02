<template>
  <div class="tab-address-info">
    <b-tab 
      :title="$t('addressInfoTab.tabName')" 
      lazy>
        <div v-if="address">
          {{ $t('addressInfoTab.address') }}: <strong>{{ address }}</strong>
        </div>
        <div v-else>
          {{ $t('global.connectMetamask1') }} <a :href="metamaskLink" target="_blank">Metamask</a> {{ $t('global.connectMetamask2') }}
      </div>
    </b-tab>
  </div>   
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  @Component({
    name: 'AddressInfo'
  })
  export default class AddressInfo extends Vue {
    @State(state => state.address) address: any;
    
  }
</script>

<style scoped lang="scss">
  
</style>