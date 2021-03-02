<template>
  <div class="nav-bar">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">NFTs</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">{{ $t('navbar.about') }}</b-nav-item>
        <b-nav-item to="/app">{{ $t('navbar.app') }}</b-nav-item>
        <b-nav-item-dropdown :text="$t('navbar.language')" right>
          
          <b-dropdown-item 
            v-for="(locale, i) in locales"
            :key="i"
            @click="translate(locale.name.substring(0, 2).toLowerCase())">
              <CountryFlag :country="locale.code" size="sm" />
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
</style>
