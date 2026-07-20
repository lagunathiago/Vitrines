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
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Portugues Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Portugues Cypress');

     });

     it('Verifica se o usuário tem permissão para criar vitrine', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

        it("Vai na Categoria", () => {

      // Clicando na Vitrine
      cy.get('[title="Vitrines"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

        //Clica na categoria 
  cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(4000)

    //Clica em editar
 cy.contains('tr', 'Vitrine Portugues Cypress')
  .within(() => {
    cy.get('button[ng-click="editShowcase(showcase)"]')
    .scrollIntoView()
      .click({ force: true })
  });
});

   it('Adiciona Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });


  /*
  //Clica em Usuario/Grupo
  cy.get('.default-padding.ng-scope > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .should('be.visible')
  .click({ force: true });

// Digita Público
cy.get('.permission-select input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Público', { force: true });

// Seleciona a opção Público
cy.contains('.ui-select-choices-row-inner, .ui-select-choices-row, li, div', 'Público', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000);

  cy.get('.default-padding.ng-scope > .permission-select > .middle > .btn-swipe-accent')
  .should('be.visible')
  .click({ force: true });

  cy.wait(3000);

  //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(5000);
*/

   
       });

    });

  });
