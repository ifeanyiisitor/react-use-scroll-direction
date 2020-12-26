/// <reference types="cypress" />

const s = {
  directionText: '[aria-label="Direction text"]',
  windowExample: '[aria-label="Window example"]',
  scrollableTargetRefExample: '[aria-label="scrollTargetRef example"]',
  suppliedTargetExample: '[aria-label="Supplied target example"]',
  scrollableElement: '[aria-label="Scrollable element"]',
}

context('useScrollDirection', () => {
  beforeEach(() => {
    cy.viewport(2000, 1500)
  })
  describe('When targeting an element using `scrollTargetFef`', () => {
    beforeEach(() => {
      cy.visit('')
    })

    it('should correctly detect scroll direction', () => {
      // Scrolling down
      cy.get(s.scrollableTargetRefExample)
        .find(s.scrollableElement)
        .scrollTo(0, 10)

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', 'DOWN')

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling up
      cy.get(s.scrollableTargetRefExample)
        .find(s.scrollableElement)
        .scrollTo(0, 5)

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', 'UP')

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling Right
      cy.get(s.scrollableTargetRefExample)
        .find(s.scrollableElement)
        .scrollTo(5, 5)

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', 'RIGHT')

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling LEFT
      cy.get(s.scrollableTargetRefExample)
        .find(s.scrollableElement)
        .scrollTo(2, 5)

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', 'LEFT')

      cy.get(s.scrollableTargetRefExample)
        .find(s.directionText)
        .should('have.text', '')
    })
  })

  describe('When targeting an explicitly supplied target element', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should correctly detect scroll direction', () => {
      // Scrolling down
      cy.get(s.suppliedTargetExample)
        .find(s.scrollableElement)
        .scrollTo(0, 10)

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', 'DOWN')

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling up
      cy.get(s.suppliedTargetExample)
        .find(s.scrollableElement)
        .scrollTo(0, 5)

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', 'UP')

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling Right
      cy.get(s.suppliedTargetExample)
        .find(s.scrollableElement)
        .scrollTo(5, 5)

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', 'RIGHT')

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling LEFT
      cy.get(s.suppliedTargetExample)
        .find(s.scrollableElement)
        .scrollTo(2, 5)

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', 'LEFT')

      cy.get(s.suppliedTargetExample)
        .find(s.directionText)
        .should('have.text', '')
    })
  })

  describe('When targeting an explicitly supplied target element', () => {
    beforeEach(() => {
      cy.visit('/window')
    })

    it('should correctly detect scroll direction', () => {
      // Scrolling down
      cy.scrollTo(0, 100, { duration: 100, easing: 'swing' })

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', 'DOWN')

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling up
      cy.scrollTo(0, 50, { duration: 100, easing: 'swing' })

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', 'UP')

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', '')

      // Scrolling Right
      cy.scrollTo(100, 50, { duration: 100, easing: 'swing' })

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', 'RIGHT')

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', '')

      // // Scrolling LEFT
      cy.scrollTo(20, 50, { duration: 100, easing: 'swing' })

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', 'LEFT')

      cy.get(s.windowExample)
        .find(s.directionText)
        .should('have.text', '')
    })
  })
})
