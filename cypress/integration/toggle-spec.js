/// <reference types="cypress" />
import { createModel } from '@xstate/test'
import { toggleMachine } from '../../src/model'

const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: page => {
      // await page.click('input')
      debugger
    }
  }
})

describe('toggle', () => {
  const testPlans = toggleModel.getShortestPathPlans()

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, () => {
          // do any setup, then...

          // await path.test(page)
          console.log(path)
          if (!path.segments.length) {
            return
          }
          debugger
          path.test()
        })
      })
    })
  })

  // it('should have full coverage', () => {
  //   return toggleModel.testCoverage()
  // })
})
