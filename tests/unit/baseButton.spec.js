import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton.vue', () => {
  let wrapper
  const slotValue = '2 weeks'
  
  beforeEach(() => {
    wrapper = shallowMount(BaseButton, {
      slots: {
        default: slotValue
      },
      propsData: {
        disabled: true
      }
    })
  })

  it('renders button', () => {
    expect(wrapper.contains('button.button')).to.be.true
  })

  it('renders slot-span', () => {
    expect(wrapper.contains('span.btn-lable')).to.be.true
  })

  it('renders default slot when passed', () => {
    const slotSpan = wrapper.find('.btn-lable')
    
    expect(slotSpan.html()).to.contain(slotValue)
  })

  it('disables the button if responding prop was passed', () => {
    const button = wrapper.find('button')

    expect(wrapper.props().disabled).to.be.true
    expect(button.element.disabled).to.be.true
  })
})
