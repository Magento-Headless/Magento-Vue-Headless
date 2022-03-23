import { shallowMount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(null, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
