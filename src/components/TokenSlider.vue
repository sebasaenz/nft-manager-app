<template>
  <div class="token-slider">
    <div
      class="slider-wrapper"
      v-if="tokens.length">
      <carousel 
        :navigationEnabled="true"
        :perPage="1"
        :perPageCustom="[[768, 2], [940, 3]]"
        class="mb-5">
        <slide 
          v-for="(token, i) in tokens"
          :key="i">
          <h3 class="token-title mb-3">
            {{ token.title }}
          </h3>
          <img :src="token.url" :id="'popover-target-' + i" />
          <button class="btn-transfer mt-3" @click="transferToken(i)">Transfer</button>
          <b-popover :target="'popover-target-' + i" triggers="hover" placement="top">
            <template #title>{{ token.title }}</template>
            Author: {{ token.author }}<br>
            Description: {{ token.description }}<br>
            Type: {{ tokenType(token.type) }}
          </b-popover>
        </slide>
      </carousel>
    </div>
    <div v-if="!tokens.length">
      You don't have any token at the moment.
    </div>
    <div v-if="tokens == ''">
      <b-spinner>

      </b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import { State, Action } from 'vuex-class'

import TokenConstants from '@/token-types'

@Component({
  name: 'TokenSlider',
  components: {
    Carousel,
    Slide
  }
})
export default class TokenSlider extends Vue {
  @State(state => state.tokens) tokens!: string;
  @Action('getWeb3') getWeb3!: () => Promise<any>;

  types: any = TokenConstants;

  tokenType (tokenNumber: number) {
    for (const [key, value] of Object.entries(this.types)) {
      if (value == tokenNumber) {
        return key.split('_').map(el => el.charAt(0) + el.substring(1).toLowerCase()).join(' ');
      }
    }
  }

  // transferToken ()
}
</script>

<style scoped lang="scss">
  .slider-wrapper h3 {font-size: 1.25rem;} 
  .slider-wrapper {padding: 0 30px; max-width: 900px; margin: 2em auto 0; display: flex; flex-wrap: wrap;}
  .slider-wrapper .slide-inner-container {width: 32%; margin-bottom: 1em; padding: 1em;}
  .slider-wrapper > div:nth-child(3n + 1) .slide-inner-container {margin-right: 2%;}
  .slider-wrapper > div img {width: 100%; width: auto; max-height: 250px; cursor: pointer;}
  /deep/ .VueCarousel {max-width: 100%;}
  /deep/ .VueCarousel-pagination {display: none !important;}
  /deep/ .VueCarousel-slide {padding: 0 2em;}

  .token-title {min-height: 2.5em;}

  .btn-transfer {width: 100%; padding: 10px; background: #fafafa; border: 2px solid #343a40; font-size: 1rem; transition: .5s ease all;}
  .btn-transfer:hover {background: #343a40; border: 2px solid #343a40; color: #fafafa;}

  @media all and (max-width: 768px) {
    .slider-wrapper h3 {font-size: 1rem;}  
    .slider-wrapper .slide-inner-container {width: 48%;}
    .slider-wrapper .slide-inner-container {margin-right: 0;}
    .slider-wrapper > div:nth-child(2n + 1) .slide-inner-container {margin-right: 2%;}
  }
</style>
