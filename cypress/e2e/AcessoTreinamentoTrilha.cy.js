Cypress.on('uncaught:exception', (err) => {
  const msg = err.message || '';

  if (
    msg.includes('Cannot read properties of null') ||
    msg.includes('Cannot read properties of undefined') ||
    msg.includes("reading 'then'") ||
    msg.includes('charAt') ||
    msg.includes('writeText') ||
    msg.includes('Clipboard') ||
    msg.includes('Document is not focused')
  ) {
    return false;
  }
});

describe("Teste - Login", () => {
   before(() => {
    cy.viewport(1920, 1080);

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Teste de Permissão", { testIsolation: false }, () => {

     it('Vai até a vitrine', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'LECTOR (Não')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Cypress (Não', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Cypress (Não mexer)');

    });

/*
    it('Verefica se o treinamento compartilhado de outro portal está visivel', () => {

        //Clica em Vertudo
        cy.get('.show-all')
        .should('be.visible')
        .click({ force: true });

               //Clica no Treinamento compartilhado
        cy.contains('.showcase-card-title', 'Teste 11741', { timeout: 60000 })
        .should('be.visible')
        .click({ force: true })


        //Verefica se o Titulo,Turma, e conteudos estão visiveis
cy.contains('h1', 'Teste 11741', { timeout: 60000 }).should('be.visible')
cy.contains('.class-container', 'Turma', { timeout: 60000 }).should('be.visible')
cy.contains('.class-container', 'Indeterminado Ilimitadas', { timeout: 60000 }).should('be.visible')
cy.contains('.class-container', 'Gratuito', { timeout: 60000 }).should('be.visible')
cy.contains('b', 'Captura de tela 2026-06-10 144046', { timeout: 60000 }).should('be.visible')
cy.contains('b', 'WhatsApp Image 2026-06-10 at 08.40.28 (1)', { timeout: 60000 }).should('be.visible')

//Clica em Voltar
cy.get('button[title="Voltar para a vitrine"]', { timeout: 60000 })
.should('be.visible')
.click({ force: true })
        
         });

         it('Verificações basica do treinamento/ Incrição no treinamento', () => {

            //Clica em Vertudo
            cy.get('.show-all')
            .should('be.visible')
            .click({ force: true });

                           //Clica no Treinamento
        cy.contains('.showcase-card-title', 'Vitrine Automação', { timeout: 60000 })
        .should('be.visible')
        .click({ force: true })

         // Clica na turma
    cy.get('label.class-container')
  .first()
  .click();

      cy.wait(2000)

      //Clica em fazer incrição
      cy.get('.selected > .class-info > .classes-actions > .btn-swipe-accent' , { timeout: 60000 })
      .should('be.visible')
      .click();

      //Verefica se realmente está no documento
      cy.contains('.info-section-title', 'Avaliacao_Excel_FIT (7)', { timeout: 60000 }).scrollIntoView().should('be.visible')
            
         });

         it('Verificações Descrição,Resumo,Sobre Autor', () => {

           //Descrição
            cy.get('.description', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .and('contain.text', 'Este treinamento foi criado exclusivamente para a realização de testes de automação relacionados às vitrines da plataforma')
                        
          //Clica em resumo
          cy.get('.tabs2 > :nth-child(2)')
          .click({ force: true })

          //Resumo
          cy.get('.text-only-content', { timeout: 60000 }).scrollIntoView().should('be.visible').and('contain.text', 'Treinamento criado exclusivamente para testes de automação nas vitrines da plataforma, permitindo validar a exibição, navegação, visibilidade, organização e funcionamento dos elementos apresentados aos usuários')
                                                                                                                      
          //Material Complementar
          cy.get('.tabs2 > :nth-child(4)')
          .click({ force: true })


          cy.get('.material-title', { timeout: 60000 }).should('be.visible').and('contain.text', 'gettyimages-691617638-170667a.jpg')

          //Clica emSobre autor
          cy.get('.tabs2 > :nth-child(5)')
          .click({ force: true })

          //Verificação
          cy.contains('.author-name', 'AUTOR LECTOR', { timeout: 60000 }).scrollIntoView().should('be.visible')

         });

         it('Proximo conteudo', () => {

            // Clica no menu lateral dos conteúdos
cy.get('#resourceMenuIndicator', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

  //Clica no proximo documento
  cy.get(':nth-child(2) > .resource-list-header')
  .should('be.visible')
  .click({ force: true })

   cy.contains('.info-section-title', 'Bugs da webconferência 03.11.2023 (4)', { timeout: 60000 }).scrollIntoView().should('be.visible')

         });

         it('Realiza a avaliação e Conclui o Treinamento', () => {

            cy.wait(1000)

            //Clica na avaliação
            cy.get(':nth-child(3) > .resource-list-header')
            .should('be.visible')
            .click({ force: true })

            //Clica em iniciar avaliação
            cy.get('.live-event-resource-message > .default-gap > .btn-swipe-accent')
            .should('be.visible')
            .click({ force: true })

       cy.get('section.q-table', { timeout: 60000 }).each(($questao) => {
  cy.wrap($questao).find('label.checkbox:visible').first().click({ force: true })
})

//Clica em enviar
  cy.get('#nextResourceArrow')
  .click()

  //Confirma
  cy.get('[switch="service.modalSendAnswers"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .click()


  //Conclui Treinamento
  cy.get('#nextResourceArrow > .resource-button-preview')
  .click()

  //Confirma
  cy.get('[switch="modal.courseFinished"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .click()
            
         });
*/
         
         it('Verificações basica de Trilha/Incrição na trilha', () => {

            //Clica em Vertudo
            cy.get('.show-all')
            .should('be.visible')
            .click({ force: true });

                           //Clica na Tril
        cy.contains('.showcase-card-title', 'Vitrine Automação Trilha', { timeout: 60000 })
        .should('be.visible')
        .click({ force: true })

/*
         // Clica na turma
    cy.get('label.class-container', { timeout: 60000 })
  .first()
  .click();

      cy.wait(2000)

     // Clica em Fazer inscrição
cy.contains('button', 'Fazer inscrição', { timeout: 60000 })
  .should('be.visible')
  .scrollIntoView()
  .click({ force: true })
            */

         });


         it('Clica na segunda etapa e abre o documento', () => {

            //Clica na segunda etapa
            cy.get(':nth-child(3) > .trail-stage')
            .should('be.visible')
            .click({ force: true })

            cy.wait(1000)
           
// Clica e abre o manual
cy.contains('.resource-name', '02 - Manual Social', { timeout: 60000 })
  .should('be.visible')
  .parents('li.trail-content')
  .first()
  .scrollIntoView()
  .click({ force: true })

  cy.wait(3000)

  // Clica em "Voltar para a trilha"
cy.contains('button', 'Voltar para a trilha', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

            
         });

          it('Clica na primeira etapa e abre o TREINAMENTO', () => {

            cy.wait(6000)

            //Clica na segunda etapa
            cy.get(':nth-child(2) > .trail-stage')
            .should('be.visible')
            .click({ force: true })

            cy.wait(1000)
           
// Clica e abre o treinamento
cy.contains('.resource-name', 'Treinamento básico automação (Não mexer)', { timeout: 10000 })
  .should('be.visible')
  .parents('li.trail-content')
  .first()
  .scrollIntoView()
  .click({ force: true })

  cy.wait(5000)

    //Conclui Treinamento
  cy.get('#nextResourceArrow > .resource-button-preview')
  .click()

  //Confirma
  cy.get('[switch="modal.courseFinished"] > .modal > :nth-child(2) > .end > .flex > .btn-swipe-accent')
  .click()


            
         });








      });

   });