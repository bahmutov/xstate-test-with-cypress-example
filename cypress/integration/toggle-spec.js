/// <reference types="cypress" />
import { createModel } from '@xstate/test'
import { toggleMachine } from '../../src/model'

const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: () => {
      console.log('test toggle model TOGGLE')
      debugger
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

  afterEach(() => {
    cy.window()
      .its('toggleMachine')
      .then(appMachine => {
        console.log('got app machine', appMachine)
        console.log('test machine', toggleModel)
      })
  })

  after(() => {
    cy.log('**checking model test coverage**').then(() => {
      toggleModel.testCoverage()
    })
  })
})
