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
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

        //exivir mensagem de erro ao submeter o formulario com um email com formatação inválida

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Deivid')
        cy.get('#lastName').type('Fuzari')
        cy.get('#email').type('deivid_fuzari@hotmail,com') //forcei o email errado. para o teste validar
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

        //campo de telefone continua vazio quando preenchido com valor não-numerico

    it('campo de telefone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone').type('abcdefghi').should('have.value','')       
    })
        //clicar no checkbox de telefone para validar a mensagem que aparece no erro.

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Deivid')
        cy.get('#lastName').type('Fuzari')
        cy.get('#email').type('deivid_fuzari@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').click()
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    // preencher e limpar os campos e depois limpar com .clear
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Deivid').should('have.value', 'Deivid').clear().should('have.value', '')
        cy.get('#lastName').type('Fuzari').should('have.value', 'Fuzari').clear().should('have.value', '')
        cy.get('#email').type('deivid_fuzari@hotmail.com').should('have.value', 'deivid_fuzari@hotmail.com').clear().should('have.value', '')
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '')
    })

    //clicar no botão e o erro aparecer que nao foi preenchido os campos obrigatórios.

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    //criei um comando dentro da pasta suporte para preencher os campos obrigatórios, para nao repetir codigo.

    it('envia o formuário com sucesso usando um comando customizado', function() {
       cy.fillMandatoryFieldsAndSubmit()

       cy.get('.success').should('be.visible')
    })

    //usando a funcionalidade select pegando o valor do select e colocando no campo de texto.

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    //Usando a funcionalidade select pegando o produto Mentoria com o valor e nao com o texto.

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    //usando a funcionalidade select pegando o produto Blog pelo indíce.

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //usando a funcionalidade check para marcar um input radio ou checkbox

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    //usando o check e apos usar verificar se todos os radios foi marcado

    it.only('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
  })
  