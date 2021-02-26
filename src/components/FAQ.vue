<template>
  <div class="faq">
    <div class="accordion" role="tablist">
      <b-card
        v-for="(qa, i) in qas"
        :key="i"
        no-body
        :style="{
          'border': '0'
        }"
        class="mb-4"
      >

        <b-card-header 
          header-tag="header" 
          class="p-1" 
          role="tab"
          :style="{
            'border-bottom': '0 !important'
          }"
        >
          <b-button 
            block 
            v-b-toggle="'accordion-' + i" 
            :style="{ 
              'background-color': '#56b36e',
              'font-size': '18px',
              'font-weight': '500'
            }"
          >
             {{ qa.q }}
          </b-button>
        </b-card-header>
    
        <b-collapse :id="'accordion-' + i" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <p 
                v-html="qa.a" 
                :style="{ 
                  'text-align': 'left', 
                  'padding': '0 30px',
                  'line-height': '1.75',
                  'margin-bottom': '0 !important'
                }"
              ></p>
            </b-card-text>
          </b-card-body>
        </b-collapse>

      </b-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'FAQ'
})
export default class FAQ extends Vue {
  @Prop() private qas!: Array<any>;

  text: string = 'Lorem Ipsum'
}
</script>

<style scoped lang="scss">
  .accordion {max-width: 900px; margin: 1em auto 2em;}
</style>