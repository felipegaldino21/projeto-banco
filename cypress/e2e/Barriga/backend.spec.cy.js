// @ts-ignore
/// <reference types="cypress"/>

const myDate = new Date(Date.now()).toLocaleString().split(',')[0];
describe('Should teste at a functional level', () => {

let token    

before(() => { 
    cy.getToken('felipegaldino21@gmail.com', 'Fgsa3316#')
        .then(tkn => {
            token = tkn
        })
});

beforeEach(() => { 
    cy.resetRest()           
});
    it('Should create an account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta via rest')

        })  
    });

    it('Should update an account', () => {
        cy.getContaByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                body:{
                    nome: 'conta alterada via rest'
                }

            }).as('response')

        })
        cy.get('@response').its('status').should('be.equal', 200)
        
        
    });
    it('Should not creat a an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
        
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')

        })  
    
    });

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: myDate,
                        data_transacao: myDate,
                        descricao: "Mov",
                        envolvido: "felipe",
                        status: true,
                        tipo: "REC",
                        valor: "100",
                    }
                }).as('response')
        
             })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    });

    it('Should get balance', () => {
        
    });

    it('Should remove an account', () => {
        
    });
});



