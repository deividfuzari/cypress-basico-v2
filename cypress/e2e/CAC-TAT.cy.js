/// <reference types="Cypress" /> ///

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
        //verificar  se o título da página é "Central de Atendimento ao Cliente TAT"

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
        //preenche os campos obrigatórios e envia o formulario

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = 'teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,'  
        cy.get('#firstName').type('Deivid')
        cy.get('#lastName').type('Fuzari')
        cy.get('#email').type('deivid_fuzari@hotmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

        //exivir mensagem de erro ao submeter o formulario com um email com formatação inválida

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Deivid')
        cy.get('#lastName').type('Fuzari')
        cy.get('#email').type('deivid_fuzari@hotmail,com') //forcei o email errado. para o teste validar
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

        //campo de telefone continua vazio quandp preenchido com valor não-numerico
        
    it('campo de telefone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone').type('abcdefghi').should('have.value','')       
    })
  })
  