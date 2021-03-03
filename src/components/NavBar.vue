<template>
  <div class="nav-bar">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">NFTs</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">{{ $t('navbar.about') }}</b-nav-item>
        <b-nav-item to="/app">{{ $t('navbar.app') }}</b-nav-item>
        <b-nav-item
          target="_blank"
          href="https://marketplace.nft-manager.com/"
          class="marketplace">Marketplace</b-nav-item>
        <b-nav-item-dropdown :text="$t('navbar.language')" right>
          
          <b-dropdown-item 
            v-for="(locale, i) in locales"
            :key="i"
            @click="translate(locale.name.substring(0, 2).toLowerCase())">
              <CountryFlag :country="locale.code" />
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CountryFlag from 'vue-country-flag'

@Component({
  name: 'NavBar',
  components: {
    CountryFlag
  }
})
export default class NavBar extends Vue {
  locales: any[] = [
    {
      name: 'English',
      code: 'gb'
    },
    {
      name: 'Español',
      code: 'es'
    }
  ];

  translate(locale: string) {
    this.$i18n.locale = locale;
  }
}
</script>

<style scoped lang="scss">
/deep/ .dropdown-menu {min-width: 5rem !important;}
/deep/ .marketplace {
  padding: 0 10px;
}
/deep/ .marketplace a {
  background: linear-gradient(#E619E2, #6C29D1); 
  color: #fafafa; 
  width: 100%; 
  border-radius: 13px; 
  border: 0; 
  padding: 9px 11px; 
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
    color: #fff !important;

    &:before {
      opacity: 1;
    }
  }

  &:active {
    color: #fff !important;
  }
}
</style>
