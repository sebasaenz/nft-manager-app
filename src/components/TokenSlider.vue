<template>
  <div class="token-slider">
    <div class="slider-wrapper">
      <div v-for="(token, i) in tokens" :key="i">
        <h3 class="mb-3">{{ token.data.name }}</h3>
        <img :src="token.data.image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'TokenSlider'
})
export default class HelloWorld extends Vue {
  @Prop() private tokens!: Array<any>;
}
</script>

<style scoped lang="scss">
  .slider-wrapper {padding: 0 30px; max-width: 900px; margin: 2em auto 0; display: flex; flex-wrap: wrap;}
  .slider-wrapper > div {width: 32%; margin-bottom: 1em; padding: 1em;}
  .slider-wrapper > div:nth-child(3n + 1) {margin-right: 2%;}
  .slider-wrapper > div img {width: 100%;}
</style>
