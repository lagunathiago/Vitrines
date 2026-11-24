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
      .type("qualidade@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Criando Vitrine", { testIsolation: false }, () => {

             it("Clica na aba Vitrine", () => {

        const abrirVitrine = (tentativa = 1) => {
  cy.get('[title="Vitrines"] > .sideitem', { timeout: 60000 }).should('be.visible').click({ force: true })
  cy.wait(1000)

  cy.get('body').then(($body) => {
    const apareceu = $body.find('span.text-area[title="Primeira Vitrine Cypress"]:visible').length > 0

    if (!apareceu && tentativa < 7) {
      abrirVitrine(tentativa + 1)
    }
  })
}

abrirVitrine()

cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 60000 }).should('be.visible')

      });

it('Clica na Categoria', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Ingles Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Ingles Cypress', { timeout: 10000 }).within(() => {
          cy.get('button[ng-click="editShowcase(showcase)"]').scrollIntoView().click({ force: true })
        })
      } else if (tentativa < 4) {
        cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true })

        cy.wait(3000)
        clicarEditarVitrine(tentativa + 1)
      } else {
        throw new Error('O botão Editar da vitrine não ficou disponível após 4 tentativas')
      }
    })
  }

  cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true })

  cy.wait(4000)
  clicarEditarVitrine()

})

it('Joga a vitrine pra categoria todos', () => {

  cy.contains('table tbody tr', 'Vitrine Ingles Cypress', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('button.icon-edit').should('be.visible').click({ force: true })
  })

  cy.wait(1000);

    //Clica no "X" tirar a categortia
    cy.get('.showcase-fields > :nth-child(4) > .multiselect > .border > .ui-select-match > .btn-default > .btn > .glyphicon')
    .should('be.visible')
    .click({ force: true });

          //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.wait(2000)

    });

    it('Verifica que a vitrine não está na categoria', () => {
  cy.contains('table tbody tr', 'Vitrine Ingles Cypress', { timeout: 10000 }).should('not.exist')

    })

      it('Vai na categoria "Todos" e verifica se aparece a vitrine', () => {

        const abrirTodos = (tentativa = 1) => {
  cy.contains('span.text-area', /^Todos$/, { timeout: 60000 }).should('be.visible').click({ force: true })
  cy.wait(1000)

  cy.get('body').then(($body) => {
    const apareceu = $body.find('table tbody div.ng-binding:contains("teste automação"):visible').length > 0

    if (!apareceu && tentativa < 7) {
      abrirTodos(tentativa + 1)
    }
  })
}

abrirTodos()

cy.contains('table tbody div.ng-binding', /^teste automoção$/i, { timeout: 60000 }).should('be.visible')

      })

   it('Verifica que a vitrine está na categoria', () => {

        cy.contains('table tbody div.ng-binding', 'Vitrine Ingles Cypress', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible') 

  });

  it('Joga a vitrine novamente pra categoria Primeira Vitrine Cypress', () => {

  cy.contains('table tbody tr', 'Vitrine Ingles Cypress', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .within(() => {
    cy.get('button.icon-edit').should('be.visible').click({ force: true })
  })

   cy.wait(1000);

})

it('Clica na categoria Primeira Vitrine Cypress', () => {

        //Clica na Categoria
    cy.get('.showcase-fields > :nth-child(4) > .multiselect > .border > .ui-select-match > .btn-default')
    .should('be.visible')
    .click({ force: true });

    cy.wait(1000);
    
    // Clica na categoria /Primeira Vitrine Cypress
cy.get('.ui-select-choices:visible', { timeout: 10000 })
  .contains('.ui-select-choices-row', '/Primeira Vitrine Cypress')
  .should('be.visible')
  .click({ force: true })

          //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.wait(2000)

    });

    it('Verifica que a vitrine está na categoria', () => {

      const abrirPrimeiraVitrine = (tentativa = 1) => {
  cy.contains('span.text-area', 'Primeira Vitrine Cypress', { timeout: 60000 }).should('be.visible').click({ force: true })
  cy.wait(1000)

  cy.get('body').then(($body) => {
    const apareceu = $body.find('table tbody div.ng-binding:contains("Vitrine Ingles Cypress"):visible').length > 0

    if (!apareceu && tentativa < 3) abrirPrimeiraVitrine(tentativa + 1)
  })
}

abrirPrimeiraVitrine()

cy.contains('table tbody div.ng-binding', 'Vitrine Ingles Cypress', { timeout: 60000 }).should('be.visible')

     });

  });

});