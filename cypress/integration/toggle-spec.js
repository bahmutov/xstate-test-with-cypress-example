/// <reference types="cypress" />
import { createModel } from '@xstate/test'
import { toggleMachine } from '../../src/model'

const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: () => {
      console.log('test toggle model TOGGLE')
      cy.log('clicking button')
      cy.get('button').click()
    }
  }
})

describe('toggle', () => {
  const testPlans = toggleModel.getShortestPathPlans()

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        console.log(path)
        if (!path.segments.length) {
          return
        }

        it(path.description, () => {
          cy.visit('/')
          cy.contains('button', 'Off')
            .should('be.visible')
            .then(() => {
              // the page has loaded
              cy.log('**starting path test**')
              return path.test()
            })
        })
      })
    })
  })

  after(() => {
    cy.log('checking full coverage')
    console.log(toggleModel.testCoverage())
  })
  // it('should have full coverage', () => {
  //   return toggleModel.testCoverage()
  // })
})
