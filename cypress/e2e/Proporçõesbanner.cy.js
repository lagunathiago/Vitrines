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
      .type("qualidade2@lectortec.com.br");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("2006lrnrgr");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Criando Vitrine", { testIsolation: false }, () => {
  
    it("Vai na categoria", () => {

      // Clicando na Vitrine
      cy.get('[title="Vitrines"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      cy.wait(3000);

  //Clica na categoria 
  cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

    });

    it('Cria a vitrine', () => {

        //Clica em criar vitrine
        cy.get('.title-bar > .icon-add', { timeout: 10000 })
        .should('be.visible')
        .click();

        //Escreve o nome
        cy.get('input[placeholder="Nome"]', { timeout: 10000 })
  .should('exist')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Vitrine Bannners';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

  });
});

it('Adiciona o Banner 6:1', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 6:1
cy.get('.modal')
  .contains('button', '6:1')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner62.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

    //insere o link
  cy.get('.modal:visible')
  .within(() => {
    cy.get('input[ng-model="img.link"][placeholder="Informe um link"]')
      .should('be.visible')
      .clear()
      .type('https://www.lector.com.br/', { force: true })
  })

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  ///PEGA MAIS UM BANNER

  // Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner34.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

     it('Adiciona o Banner 3:1', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 3:1
cy.get('.modal')
  .contains('button', '3:1')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner31.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

    //insere o link
  cy.get('.modal:visible')
  .within(() => {
    cy.get('input[ng-model="img.link"][placeholder="Informe um link"]')
      .should('be.visible')
      .clear()
      .type('https://www.lector.com.br/', { force: true })
  })

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

        it('Adiciona o Banner 21:9', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 21:9
cy.get('.modal')
  .contains('button', '21:9')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/bannner219.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

      it('Adiciona o Banner 4:3', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 4:3
cy.get('.modal')
  .contains('button', '4:3')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner43.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

       it('Adiciona o Banner 1:1', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 1:1
cy.get('.modal')
  .contains('button', '1:1')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner11.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

      it('Adiciona o Banner 3:4', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 3:4
cy.get('.modal')
  .contains('button', '3:4')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner34.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

        it('Adiciona o Banner 9:16', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 9:16
cy.get('.modal')
  .contains('button', '9:16')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner916.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

        it('Adiciona o Banner 9:21', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em banner
cy.get('[ng-click="addBanner();"]')
.should('be.visible')
.click();

// Seleciona proporção 9:21
cy.get('.modal')
  .contains('button', '9:21')
  .click({ force: true });

// Pega o input file ligado à área "Arraste..."
cy.contains('.modal', 'Arraste para cá ou selecione os arquivos', { timeout: 10000 })
  .parent()
  .find('input[type="file"]')
  .selectFile('cypress/fixtures/banner921.png', { force: true });

  cy.wait(2000);

  //Clica em salvar
  cy.get('.modal > .modal-footer > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em ambos
  cy.get('.center > :nth-child(2) > .icon-radio')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

     });

      it('Adiciona Permição', () => {

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

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

    });

     it('Clica em sair', () => {

        cy.wait(4000);

        //Clioca no icon
  cy.contains('div', 'Administrador',{ timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)
    
// Clica em Sair
cy.contains('#user-options.options.show div.ml-10', 'Sair', { timeout: 10000 })
  .should('be.visible')
  .parents('div.option.menu-option')
  .first()
  .click({ force: true });

    });

     it('Vai até a vitrine', () => {

        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(1000)

// Clica na segunda vitrine da categoria
cy.contains(
  '#showcaseNavigation2026 button.menu-open-showcase',
  /Vitrine Ban+ers/i,
  { timeout: 15000 }
)
  .should('be.visible')
  .click({ force: true })

    });

    it('Verificação dos banners', () => {

        //Verefica se tem 5 banners
        cy.get('banner-carousel', { timeout: 60000 })
  .should('have.length.at.least', 5)


    });

  }); 

});
