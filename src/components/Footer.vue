<template>
  <div class="footer">
    <div class="footer-copy">
      {{ fullMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Footer'
})
export default class HelloWorld extends Vue {
  @Prop() private msg?: string;

  get fullMessage(): string {
    return `${new Date().getFullYear()} © ${this.$t('footer.copy')}${ this.msg ? ' | ' + this.msg : ''}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .footer {background-color: #343a40; color: #fff; padding: 1em 0;}
</style>
