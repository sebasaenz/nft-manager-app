<template>
  <div class="nfts-app">
    <NFTMainComponent 
      :hasMetamask="$ethereum !== undefined"
    />
  </div>
</template>

<script>
import NFTMainComponent from '@/components/NFTMainComponent.vue'

export default {
  name: 'Home',
  components: {
    NFTMainComponent
  }
}
</script>
