<template>
  <div id="app">
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand to="/">NFTs</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/app">App</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <div class="router-view">
        <RouterView />
      </div>
      <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.router-view {
  width: 100%;
  min-height: calc(100vh - 112px);
}
</style>
