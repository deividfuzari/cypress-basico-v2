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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Deivid')
    cy.get('#lastName').type('Fuzari')
    cy.get('#email').type('deivid_fuzari@hotmail.com')
    cy.get('#open-text-area').type('texto')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('verificationtitle', function(){
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})

Cypress.Commands.add('name_lastname_email', function(data){
    const banana = data.css_first_name
    const name = data.name  
    const css_last_name = data.css_last_name
    const css_email = data.css_email
    const last_name = data.last_name
    const email = data.email

    cy.get(banana).type(name)
    cy.get(css_last_name).type(last_name)
    cy.get(css_email).type(email)
})

Cypress.Commands.add('clickonbutton', function(){
    cy.contains('button', 'Enviar').click()
})