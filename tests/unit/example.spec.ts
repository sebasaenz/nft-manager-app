import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import MyTokens from '@/components/tabs/AddressInfo.vue'
import TokenInfo from '@/components/TokenInfo.vue';
import AddressInfo from '@/components/tabs/AddressInfo.vue'

import VueI18n from 'vue-i18n'
import messages from '@/locales'

import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n);
localVue.use(BootstrapVue);

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages
})

/*
 * Example test
 */
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('MyTokens.vue', () => {
  it('renders Metamask copy when store address is empty string', () => {
    let store = new Vuex.Store({
      state: {
        address: '' 
      }
    })

    const wrapper = shallowMount(MyTokens, { i18n, store, localVue })
    const addressWrapper = wrapper.find('.metamask-copy');
    expect(addressWrapper.exists()).toBe(true);
    expect(addressWrapper.text().includes('Metamask')).toBe(true);
  })
})

describe('TokenInfo.vue', () => {
  it('properly gets the contract info', () => {
    const contractAddressObject = require('@/contracts/goerli/address');
    const wrapper = shallowMount(TokenInfo, { i18n, localVue });

    (wrapper.vm as any).setContractInfo()
    expect((wrapper.vm as any).contractInfo.includes(contractAddressObject.default.address)).toBe(true);
  })
})

describe('AddressInfo.vue', () => {
  it('renders address when store address isn\'t empty string', () => {
    let store = new Vuex.Store({
      state: {
        address: '0xC257274276a4E539741Ca11b590B9447B26A8051' 
      }
    })

    const wrapper = shallowMount(AddressInfo, { i18n, store, localVue })
    const addressWrapper = wrapper.find('div strong');
    expect(addressWrapper.text()).toMatch(store.state.address);
  })

  it('renders Metamask copy when store address is empty string', () => {
    let store = new Vuex.Store({
      state: {
        address: '' 
      }
    })

    const wrapper = shallowMount(AddressInfo, { i18n, store, localVue })
    const addressWrapper = wrapper.find('.metamask-copy');
    expect(addressWrapper.exists()).toBe(true);
    expect(addressWrapper.text().includes('Metamask')).toBe(true);
  })
})
