<template>
  <div id="app">
    <NavBar />
    <div class="router-view">
      <RouterView />
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
  /deep/ .navbar-dark .navbar-nav .nav-link {font-weight: 500; color: #fff; transition: 0.2s ease all;}
</style>

<style lang="scss">
@import '@/styles/_custom.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.router-view {width: 100%; min-height: calc(100vh - 112px);}

.btn:focus, .btn.focus {box-shadow: none !important;}

.btn-cool {
  background: linear-gradient(#E619E2, #6C29D1); 
  color: #fafafa; 
  width: 100%; 
  border-radius: 5px; 
  border: 0; 
  padding: 9px; 
  position: relative;
  z-index: 100;

  span {
    position: absolute;
    right: 0.5em;
    font-size: 1.5em;
    top: 50%;
    transform: translateY(-50%);
    transition: .2s ease all;
    line-height: 0;
  }

  &.not-collapsed span {
    transform: rotate(45deg);
  }
  
  &:before {
    content: '';    
    border-radius: inherit;
    background: linear-gradient(#E619E2, #6C29D1 80%);
    display: block;
    height: 100%;
    position: absolute;
    top: 0; left: 0;
    opacity: 0;
    width: 100%;
    z-index: -100;
    transition: .1s ease all;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
}
</style>
