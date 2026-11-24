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

      cy.wait(10000);

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

  });

  context("Criando Vitrine", { testIsolation: false }, () => {
  

    it("Clica na aba vitrine", () => {

const abrirVitrinesAteCategoriaAparecer = (tentativa = 1) => {
  cy.get('[title="Vitrines"] > .sideitem', { timeout: 60000 }).should('be.visible').click({ force: true })

  cy.get('body').then(($body) => {
    const categoriaVisivel = $body.find('span.text-area:visible').filter((_, elemento) =>
      elemento.innerText.trim() === 'Primeira Vitrine Cypress'
    ).length > 0

    if (!categoriaVisivel && tentativa < 5) {
      cy.wait(1000)
      abrirVitrinesAteCategoriaAparecer(tentativa + 1)
    }
  })
}

abrirVitrinesAteCategoriaAparecer()

cy.contains('span.text-area', 'Primeira Vitrine Cypress', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true })

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
    input.value = 'PERMISSÃO TRILHA';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

   });

  });

 it('Adiciona o Carrosel', () => {

        //Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em adicionar carrosel
cy.get('[ng-click="addCarousel();"]')
.should('be.visible')
.click();

//Flega o título
cy.get(':nth-child(1) > .flex > .checkbox > .icon-checkbox')
.should('be.visible')
.click();

cy.wait(1000);

//Escreve o título
cy.get('input[placeholder="Título"]')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Título Automação Permissão';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

  //Flega o idioma
  cy.get(':nth-child(2) > .flex > .checkbox > .icon-checkbox')
  .should('be.visible')
  .click();

  cy.wait(1000);

cy.get('input[placeholder="Descrição"]')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Automação Permissão';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });
        
     });
     it('Adiciona o Cartão Avanaçado 1', () => {

        //Adiciona o cartão
        cy.get('.mt-20 > .middle > .btn')
        .should('be.visible')
        .click();

        cy.wait(2000);

        //Clica no cartão
        cy.get(':nth-child(6) > :nth-child(1) > .showcase-card-container')
        .scrollIntoView()
        .should('be.visible')
        .click();
         
     })

   it('Adiciona as 4 trilha ao carrossel', () => {

  const treinamentos = [
    'TRILHA AUTOMAÇÃO PERMISSÃO PUBLICA',
    'TRILHA AUTOMAÇÃO PERMISSÃO ALUNO',
    'TRILHA AUTOMAÇÃO PERMISSÃO CARGO ANALISTA SR',
    'TRILHA AUTOMAÇÃO PERMISSÃO OUTRO'
  ];

  cy.wrap(treinamentos).each((treinamento) => {

    cy.log(`Adicionando: ${treinamento}`);

      // Abre o select da trilha
    cy.get('.modal')
      .contains('span.ui-select-placeholder', 'Escolha uma trilha')
      .click({ force: true });

    // Pesquisa pelo nome da trilha
    cy.get('.modal input.ui-select-search:visible', { timeout: 60000 })
      .clear({ force: true })
      .type(treinamento, { force: true });

    // Seleciona exatamente a trilha pesquisada
    cy.contains(
      '.ui-select-choices-row:visible',
      treinamento,
      { timeout: 60000 }
    )
      .should('be.visible')
      .click({ force: true });

    // Clica em adicionar
    cy.get('.center > .btn-swipe-accent')
      .should('be.visible')
      .click();

    cy.log(`Treinamento adicionado: ${treinamento}`);

     });

       //Clica em Salvar
  cy.get('[ng-click="saveCarousel()"]')
  .scrollIntoView()
  .click();

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

// #################################################################################################
// #                                                                                               
// #                         VEREFICA A TURMA ESTÁ DISPONIVEL PARA O PUBLICA NA TRILHA AUTOMAÇÃO PERMISSÃO PUBLICA                     
// #                                                                                               
// #################################################################################################


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
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

     it('Vai até o TRILHA com permissão PUBLICA', () => {

        //Clica no TRILHA AUTOMAÇÃO PERMISSÃO PUBLICA
        cy.get(':nth-child(1) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

     });

        it('Valida as turmas gratuita e paga', () => {

  cy.contains('.txt-bold', 'GRATUITO')
    .should('be.visible');

  cy.contains('.txt-bold', 'PAGO')
    .should('be.visible');
        
   });

// #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO ALUNO" NÃO ESTÁ DISPONIVEL PRO PUBLICO
// #                                                                                               
// #################################################################################################

    it('Volta pra vitrine', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissão Aluno', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO ALUNO
        cy.get(':nth-child(2) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

        });

        it('Verifica as turmas PAGAS E GRATUITAS não estejam visiveis pro usuario de outro aluno', () => {

            cy.wait(7000)

  cy.contains('.txt-bold', 'GRATUITO')
    .should('not.exist');

  cy.contains('.txt-bold', 'PAGO')
    .should('not.exist');

    
 });


 // #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO ALUNO" ESTÁ DISPONIVEL PRO ALUNO
// #                                                                                               
// #################################################################################################


   it('Loga no perfil aluno', () => {

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("lector1305@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

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

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissão ALUNO', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO ALUNO
        cy.get(':nth-child(2) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

      })

        it('Verifica as turmas PAGAS E GRATUITAS', () => {

  cy.contains('.txt-bold', 'GRATUITO', { timeout: 10000 })
    .should('be.visible');

  cy.contains('.txt-bold', 'PAGO', { timeout: 10000 })
    .should('be.visible');

});

 // #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO ANALISTA SR" NÃO ESTÁ DISPONIVEL PRO ALUNO QUE NÃO FAZ PARTE DO DESSE CARGO
// #                                                                                               
// #################################################################################################

  it('Volta pra vitrine', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissãO GRUPO - 2', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO ALUNO
        cy.get(':nth-child(3) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

         });

        it('Verifica as turmas PAGAS E GRATUITAS não estejam visiveis pro usuario de outro grupo', () => {

            cy.wait(7000)

  cy.contains('.txt-bold', 'GRATUITO', { timeout: 10000 })
    .should('not.exist');

  cy.contains('.txt-bold', 'PAGO', { timeout: 10000 })
    .should('not.exist');

 });

// #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO ANALISTA SR" ESTÁ DISPONIVEL PRO ALUNO DESTE CARGO
// #                                                                                               
// #################################################################################################


  it('Loga no perfil Grupo - 2', () => {

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("benose@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

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

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissão CAROGO SR', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO grupo - 2
        cy.get(':nth-child(3) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

          })

        it('Verifica as turmas PAGAS E GRATUITAS', () => {

  cy.contains('.txt-bold', 'GRATUITO', { timeout: 10000 })
    .should('be.visible');

  cy.contains('.txt-bold', 'PAGO', { timeout: 10000 })
    .should('be.visible');

});


// #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO UNIDADE OUTRO" NÃO ESTÁ DISPONIVEL PRO ALUNO DE OUTRA UNIDADE
// #                                                                                               
// #################################################################################################

 it('Volta pra vitrine', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissãO UNIDADE OUTRO', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO OUTRO
        cy.get(':nth-child(4) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

          })

        it('Verifica as turmas PAGAS E GRATUITAS não estejam visiveis pro usuario de outrA UNIDADE', () => {

            cy.wait(7000)

  cy.contains('.txt-bold', 'GRATUITO', { timeout: 10000 })
    .should('not.exist');

  cy.contains('.txt-bold', 'PAGO', { timeout: 10000 })
    .should('not.exist');

 });
      
// #################################################################################################
// #                                                                                                     
// #                         VEREFICA AS TURMA DO "TRILHA AUTOMAÇÃO PERMISSÃO UNIDADE OUTRO" ESTÁ DISPONIVEL PRO ALUNO DE OUTRA UNIDADE
// #                                                                                               
// #################################################################################################


 it('Loga no perfil unidade OUTRO', () => {

    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("09012tes@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

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

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'PERMISSÃO TRILHA', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(5000);

     });

      it('Vai até o TRILHA com permissão Outro', () => {

        //Clica no TRILHA TRILHA AUTOMAÇÃO PERMISSÃO Outro
        cy.get(':nth-child(4) > .card-container > [ng-init="trail = content.entity"] > a.ng-scope > .showcase-card-container', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

          })

        it('Verifica as turmas PAGAS E GRATUITAS', () => {

  cy.contains('.txt-bold', 'GRATUITO', { timeout: 10000 })
    .should('be.visible');

  cy.contains('.txt-bold', 'PAGO', { timeout: 10000 })
    .should('be.visible');


   });

 });

});
