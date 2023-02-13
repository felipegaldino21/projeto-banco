// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from '../support/locators'
// @ts-ignore
Cypress.Commands.add('clickAlert', (locator, message) =>{
    // @ts-ignore
    cy.get(locator).click()
    cy.on('window:alert', msg =>{
        expect(msg).to.be.equal(message)
    })
})

// @ts-ignore
Cypress.Commands.add('login', () =>{
    
    cy.get(loc.LOGIN.USER).type('felipegaldino21@gmail.com')
    cy.get(loc.LOGIN.PASSWORD).type('Fgsa3316#')
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE_SUCESS).should('exist')
    cy.get(loc.MESSAGE_SUCESS).should('contain', 'Felipe Galdino')

})
// @ts-ignore
Cypress.Commands.add('resetApp',() =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})
