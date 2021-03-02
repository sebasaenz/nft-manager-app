<template>
  <div class="tab-my-tokens">
    <b-tab 
      :title="$t('myTokensTab.tabName')" 
      lazy
    >
      <b-card-text>
        <div v-if="address">
            <TokenInfo :address="address" />
        </div>
        <div v-else>
            {{ $t('global.connectMetamask1') }} <a :href="metamaskLink" target="_blank">Metamask</a> {{ $t('global.connectMetamask2') }}
        </div>
      </b-card-text>
    </b-tab>
  </div>   
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';
  import TokenInfo from '@/components/TokenInfo.vue';

  @Component({
    name: 'MyTokens',
    components: {
      TokenInfo
    }
  })
  export default class MyTokens extends Vue {
    @State(state => state.address) address: any;
    
  }
</script>

<style scoped lang="scss">
  
</style>