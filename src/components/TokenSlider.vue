<template>
  <div class="token-slider">
    <div 
      class="slider-wrapper" 
      v-if="tokens"
    >
      <carousel 
        :navigationEnabled="true" 
        :perPage="1" 
        :perPageCustom="[[768, 2], [940, 3]]"
      >
        <slide 
          v-for="(token, i) in tokens" 
          :key="i"
        >
          <h3 class="mb-3">
            {{ token.name }}
          </h3>
          <img :src="token.image" />
        </slide>
      </carousel>
    </div>
    <div v-if="!tokens">
      <b-spinner 
         variant="primary" 
         label="Spinning"
      ></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';

@Component({
  name: 'TokenSlider',
  components: {
    Carousel,
    Slide
  }
})
export default class HelloWorld extends Vue {
  @Prop() private tokens!: Array<any>;
}
</script>

<style scoped lang="scss">
  .slider-wrapper h3 {font-size: 1.25rem;} 
  .slider-wrapper {padding: 0 30px; max-width: 900px; margin: 2em auto 0; display: flex; flex-wrap: wrap;}
  .slider-wrapper .slide-inner-container {width: 32%; margin-bottom: 1em; padding: 1em;}
  .slider-wrapper > div:nth-child(3n + 1) .slide-inner-container {margin-right: 2%;}
  .slider-wrapper > div img {width: 100%; max-width: 250px;}
  /deep/ .VueCarousel {max-width: 100%;}
  /deep/ .VueCarousel-pagination {display: none !important;}
  /deep/ .VueCarousel-slide {padding: 0 2em;}

  @media all and (max-width: 768px) {
    .slider-wrapper h3 {font-size: 1rem;}  
    .slider-wrapper .slide-inner-container {width: 48%;}
    .slider-wrapper .slide-inner-container {margin-right: 0;}
    .slider-wrapper > div:nth-child(2n + 1) .slide-inner-container {margin-right: 2%;}
  }
</style>
