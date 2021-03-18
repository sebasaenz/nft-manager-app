<template>
  <div class="home">
    <b-carousel
      id="hero-carousel"
      :interval="4000"
      :controls="false"
      indicators
      background="#ababab"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >

      <b-carousel-slide
        :img-src="require('@/assets/hero1.jpg')"
      >
        <h1>NFTs</h1>
        <p>Unique digital art and blockchain-based security-first solutions</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
  #hero-carousel >>> img {aspect-ratio: 16 / 9; object-fit: cover; max-height: calc(100vh - 112px); position: relative;}
  #hero-carousel >>> img:after {content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #000; opacity: 0.2;}
  #hero-carousel >>> .carousel-caption {bottom: 50%; text-align: left;}
  #hero-carousel >>> .carousel-caption h1 {font-size: 4.5rem;}
  #hero-carousel >>> .carousel-caption p {font-size: 1.8rem;}
</style>
