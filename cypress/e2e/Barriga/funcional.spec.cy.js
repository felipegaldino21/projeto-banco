// @ts-ignore
/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should teste at a functional level', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/');
        
        cy.login();
        
        
    });
    it('Should create an account', () => {
       cy.resetApp();
       cy.acessarMenuConta();
        
        cy.inserirConta('Conta de teste');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE_SUCESS).should('contain', 'Conta inserida com sucesso!');
    });

    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear();
        cy.get(loc.CONTAS.NOME)
            .type('Conta alterada');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.wait(1000);
        cy.get(loc.MESSAGE_SUCESS).should('contain', 'Felipe Galdino');
        });
    it('Should not creat a an account with same name', () => {
        cy.acessarMenuConta();
        cy.wait(1000);
        cy.get(loc.CONTAS.NOME).type('Conta alterada');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE_SUCESS).should('contain', 'code 400');
    });

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter');
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
        cy.get(loc.MESSAGE_SUCESS).should('contain', 'sucesso!')


        
    });
});



