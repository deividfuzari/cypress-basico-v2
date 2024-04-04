/// <reference types="Cypress" /> ///

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').click().type('Deivid').should('have.value', 'Deivid')
        cy.get('#lastName').click().type('Fuzari').should('have.value', 'Fuzari')
        cy.get('#email').click().type('deivid_fuzari@hotmail.com').should('have.value', 'deivid_fuzari@hotmail.com')
    })
  })
  