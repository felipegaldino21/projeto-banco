import loc from './locators'

// @ts-ignore
Cypress.Commands.add('acessarMenuConta', () =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

// @ts-ignore
Cypress.Commands.add('inserirConta', conta =>{
    // @ts-ignore
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})
