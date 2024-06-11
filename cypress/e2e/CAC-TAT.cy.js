/// <reference types="Cypress" /> ///

describe('Central de Atendimento ao Cliente TAT', function() {
    const USAR_AVANCO_MS = 3000     //3 segundos em milesegundos
    const name = 'Deivid'
    const last_name = 'Fuzari'
    const css_first_name = '#firstName'
    const css_last_name = '#lastName'
    const css_email = '#email'
    const email = 'deivid_fuzari@hotmail.com'


    beforeEach(function(){
        cy.visit('./src/index.html')
    })
        //verificar  se o título da página é "Central de Atendimento ao Cliente TAT"

    it('verifica o título da aplicação', function() {
        cy.verificationtitle()
    })
        //preenche os campos obrigatórios e envia o formulario

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = 'teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste,'  
        cy.clock()
        cy.name_lastname_email({css_first_name: css_first_name , css_last_name: css_last_name, last_name: last_name, name: name, css_email: css_email, email: email})
        
        cy.get('#open-text-area').type(longtext, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(USAR_AVANCO_MS)
        cy.get('.success').should('not.be.visible')
    })

        //exivir mensagem de erro ao submeter o formulario com um email com formatação inválida

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()

        const batata = cy.contains('button', 'Enviar').click()

        cy.get(css_first_name).type(name)
        cy.get(css_last_name).type(last_name)
        cy.get(css_email).type('deivid_fuzari@hotmail,com') //forcei o email errado. para o teste validar
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        //cy.contains('@enviar')
        //cy.clickonbutton()
        batata
        cy.get('.error').should('be.visible')

        cy.tick(USAR_AVANCO_MS)
        cy.get('.error').should('not.be.visible')
    })

        //campo de telefone continua vazio quando preenchido com valor não-numerico

    it('campo de telefone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone').type('abcdefghi').should('have.value','')       
    })
        //clicar no checkbox de telefone para validar a mensagem que aparece no erro.


    Cypress._.times(5, function(){      //biblioteca lodash usando times.
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            cy.clock()

            cy.name_lastname_email({css_first_name: css_first_name , css_last_name: css_last_name, last_name: last_name, name: name, css_email: css_email, email: email})
            
            cy.get('#open-text-area').type('teste')
            cy.get('#phone-checkbox').check()
            //cy.get('button[type="submit"]').click()
            cy.clickonbutton()
            cy.get('.error').should('be.visible')
    
            cy.tick(USAR_AVANCO_MS)
            cy.get('.error').should('not.be.visible')
        })
    })

    // preencher e limpar os campos e depois limpar com .clear
    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get(css_first_name).type(name).should('have.value', name).clear().should('have.value', '')
        cy.get(css_last_name).type(last_name).should('have.value', last_name).clear().should('have.value', '')
        cy.get(css_email).type(email).should('have.value', email).clear().should('have.value', '')
        cy.get('#phone').type('1234567890').should('have.value', '1234567890').clear().should('have.value', '')
    })

    //clicar no botão e o erro aparecer que nao foi preenchido os campos obrigatórios.

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        //cy.get('button[type="submit"]').click()
        cy.clickonbutton()
        cy.get('.error').should('be.visible')
        cy.tick(USAR_AVANCO_MS)
        cy.get('.error').should('not.be.visible')
    })
    
    //criei um comando dentro da pasta suporte para preencher os campos obrigatórios, para nao repetir codigo.

    it('envia o formuário com sucesso usando um comando customizado', function() {
       cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

       cy.get('.success').should('be.visible')
       cy.tick(USAR_AVANCO_MS)
       cy.get('.success').should('not.be.visible')
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

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()         //obs: da pra usar o get aqui
            cy.wrap($radio).should('be.checked')//obs: da pra usar o get aqui
        })
    })

    //usando check para marcar todos os checkboxes agora, usando each para passar em todos desmarcar o ultimo.

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //selecionar um arquivo da pasta fixtures, usar funcao de callback no should

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //selecionar um arquivo da pasta fixtures, mas dessa vez da maneira "arrastanto o arquivo, com o objeto action"

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //selecionar um arquivo da pasta fixtures, sem o caminho todo usando fixture, e .as para dar nome a um comando.

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('Qualquernome')
        cy.get('input[type="file"]').selectFile('@Qualquernome')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })

    //aprendendo a verificar um link se ele possui atributo target e valor _blank sem usar o invoke.

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    //acessar outra aba do navegador usando o invoke para remover o atributo e o valor do elemento html.

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })
        
    //testando a página da política de privacidade e interagir com alguma funcionalidade dele.
    
    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
        cy.get('h1[id="title"]').invoke('text').should('be.equal', 'CAC TAT - Política de privacidade')
        //cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
                        //finalizado as funcionalidades simples de cypress



    //aprendendo a usar as funcionalidades invoke('show') e invoke('hide')
    
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    //usando o invoke val para preencher um campo de texto

    it('preenche a area de texto usando o comando invoke', function(){
        const textValue = Cypress._.repeat('texto do fuzari, ', 10)

       cy.get('#open-text-area').invoke('val', textValue)
            .should('have.value', textValue)

    })

    //requisição http com GET, depois desestruturar a resposta
    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('encontra o gato escondido', function(){
        cy.get('#cat').invoke('show')
            .should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Eu 💚 gatos!')
    })
  })
  
                            