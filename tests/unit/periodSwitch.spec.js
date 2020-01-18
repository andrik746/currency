import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PeriodSwitch from '@/components/PeriodSwitch.vue'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton.vue', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallowMount(PeriodSwitch)
  })

  it('contains BaseButton component', () => {
    expect(wrapper.contains(BaseButton)).to.be.true
  })
  
  it('contains 3 buttons', () => {
    expect(wrapper.contains('.two-weeks-button')).to.be.true
    expect(wrapper.contains('.month-button')).to.be.true
    expect(wrapper.contains('.six-month-button')).to.be.true
  })
})
