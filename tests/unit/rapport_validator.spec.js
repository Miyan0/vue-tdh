import { validateFutureDate, validatePreviousDate } from '@/components/rapports/validators'

describe('future date validation', () => {
  it('should reject today', () => {
    const today = new Date()
    expect(validateFutureDate(today)).toBe(false)
  }),

  it('should reject previous date', () => {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() - 1)
    expect(validateFutureDate(aDate)).toBe(false)
  }),

  it('should accept future dates', () => {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() + 1)
    expect(validateFutureDate(aDate)).toBe(true)
  })
})

describe('previous date validation', () => {
  it('should accept today', () => {
    const today = new Date()
    expect(validatePreviousDate(today)).toBe(true)
  }),

  it('should accept previous date', () => {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() - 1)
    expect(validatePreviousDate(aDate)).toBe(true)
  }),

  it('should reject future dates', () => {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() + 1)
    expect(validatePreviousDate(aDate)).toBe(false)
  })
})



// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

