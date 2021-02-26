<template>
  <div class="about">
    <h1>FAQs</h1>
    <FAQ :qas="qas" />
  </div>
</template>

<script>
import FAQ from '@/components/FAQ.vue'
import qas from '@/static/qas'

export default {
  name: 'About',
  components: {
    FAQ,
  },
  data () {
    return {
      qas: qas
    }
  }
}
</script>

<style scoped>
  .about {padding-top: 2em;}
</style>
