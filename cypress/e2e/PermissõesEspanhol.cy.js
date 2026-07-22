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

    cy.viewport(1920, 1080)
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()

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

 // #################################################################################################
// #                                                                                               #
// #                         VEREFICA SE A VITRINE PUBLICA NÃO ESTÁ DISPONIVEL PRO PERFIL ALUNO  EM PORTUGUES                         #
// #                                                                                               #
// #################################################################################################

     it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

       it('Verifica se a vitrine está disponivel na visão publca em Espanhol', () => {

        cy.wait(2000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

    });

     it('Verifica se todos os componentes estão na pagina', () => {

        cy.wait(5000);

        // Verifica se a área de pesquisa está visível
cy.get('.showcase-search', { timeout: 10000 })
  .should('be.visible');

  // Verifica se o banner está visível
cy.get('a.banner-container', { timeout: 10000 })
  .should('be.visible');

  const tituloVitrine = 'Título EDITADO LECTOR Espanhol';
const descricaoVitrine = 'Descrição EDITADA LECTOR Espanhol';

cy.contains('.carousel-container', tituloVitrine, { timeout: 20000 })
  .scrollIntoView()
  .should('be.visible')
  .within(() => {
    cy.contains('.showcase-title span', tituloVitrine)
      .should('be.visible');

    cy.contains('.showcase-description', descricaoVitrine)
      .should('be.visible');

    cy.get('card-carousel', { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  });
});

  it('Verifica se o Rich text está disponivel', () => {

  // Verifica se o bloco de Rich Text está visível
cy.get('.showcase-rich-text-content', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible');

// Verifica o texto do Rich Text
cy.get('.showcase-rich-text-content')
  .should('contain.text', 'Texto de teste no Rich Text');

// Verifica se a imagem do Rich Text está visível
cy.get('.showcase-rich-text-content img', { timeout: 10000 })
  .should('be.visible')
  .and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });

  });

         it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

    
      it('Loga no Perfil administrador para adicionar Permissão Grupo (Grupo - 2)', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

it('Adiciona Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica na lixeira para excluir a permisão publica
  cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000);

  //Clica em Usuario/Grupo
  cy.get('.default-padding.ng-scope > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .should('be.visible')
  .click({ force: true });

// Digita Grupo - 2
cy.get('.permission-select input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Grupo - 2', { force: true });

// Seleciona a opção Grupo - 2
cy.contains('.ui-select-choices-row-inner, .ui-select-choices-row, li, div', 'Grupo - 2', { timeout: 10000 })
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


it('Entra no perfil que faz parte do "Grupo - 2"', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

 it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

      it('Vai até a vitrine e Verefica se a está disponivel para o Usuario do grupo no idioma Espanhol', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Espanhol Cypress');

     });

                 it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });
   
        it('Entra em outro perfil que não faz parte do grupo (Grupo - 2)', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("pessoa2@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

 it('Não exibe a vitrine para usuário fora do grupo', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

             it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

          it('Loga no Perfil administrador', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

  it('Exclui Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica na lixeira para excluir a pemissão de grupo (Grupo - 2)
  cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000);

    //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(5000);

       });

               it('Entra no perfil que faz parte do "Grupo - 2" e verefica que a vitrine não esteja mais disponivel', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

      it('Verefica que a vitrine nestá mais visivel pro usuario', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

                 it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

    // #################################################################################################
// #                                                                                               #
// #                         TESTE DE PERMISSÃO DE CARGO (ANALISTA DE TESTES JR)                                  #
// #                                                                                               #
// #################################################################################################

      it('Adicina Permissão Cargo (Analista de Testes JR)', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

 it('Adiciona Permição de Cargo', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica em Usuario/Grupo
  cy.get('.default-padding.ng-scope > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .should('be.visible')
  .click({ force: true });

// Digita Analista de Testes JR
cy.get('.permission-select input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Analista de Testes JR', { force: true });

// Seleciona a opção Analista de Testes JR
cy.contains('.ui-select-choices-row-inner, .ui-select-choices-row, li, div', 'Analista de Testes JR', { timeout: 10000 })
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

         it('Entra no perfil que faz parte do "Analista de Testes JR"', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno em portugues', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

      it('Vai até a vitrine e Verefica se a está disponivel para o Usuario', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Espanhol Cypress');

     });

              it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(12000)
        
    });

             it('Entra em outro perfil que não faz parte do cargo (Analista de Testes JR)', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("pessoa2@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(12000)
        
    });

     it('Não exibe a vitrine para usuário fora do cargo', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

       it('Troca para pro idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(12000)

    });

     it('Exclui a Permissão (Analista de Testes JR)', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

 it('Exclui Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica na lixeira para excluir a pemissão de grupo (Grupo - 2)
  cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000);

    //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(5000);

       });

  it('Entra no perfil que faz parte do cargo "Analista de Testes JR" e verefica que a vitrine não esteja mais disponivel', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

       it('Verefica que a vitrine não está mais visivel pro usuario', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

                 it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)

    });


// #################################################################################################
// #                                                                                               #
// #                         TESTE DE PERMISSÃO DE UNIDADE — OUTRO                                  #
// #                                                                                               #
// #################################################################################################

    it('Adicina Permissão Unidade (Outro)', () => {
        
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

      it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

   it('Adiciona Permição de Unidade', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica em Usuario/Grupo
  cy.get('.default-padding.ng-scope > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .should('be.visible')
  .click({ force: true });

// Digita Outro
cy.get('.permission-select input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('Outro', { force: true });

// Seleciona a opção Outro
cy.get('.ui-select-choices-row:visible span[title="Outro"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

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

                 it('Entra no perfil que faz parte da unidade "Outro"', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(12000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

              it('Entra no perfil que faz parte do "Analista de Testes JR"', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno em portugues', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

      it('Vai até a vitrine e Verefica se a está disponivel para o Usuario', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Espanhol Cypress');

     });

              it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)

    });

             it('Entra em outro perfil que não faz parte do cargo (Analista de Testes JR)', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("pessoa2@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(12000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(8000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

     it('Não exibe a vitrine para usuário fora da unidade', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

       it('Troca para pro idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(10000)

    });

      it('Exclui a Permissão (Analista de Testes JR)', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

 it('Exclui Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica na lixeira para excluir a pemissão de grupo (Grupo - 2)
  cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000);

    //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(5000);

       });

  it('Entra no perfil que faz parte do cargo "Analista de Testes JR" e verefica que a vitrine não esteja mais disponivel', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

       it('Verefica que a vitrine não stá mais visivel pro usuario', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

                 it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)

    });


// #################################################################################################
// #                                                                                               #
// #                         TESTE DE PERMISSÃO DE USUARIO                                 #
// #                                                                                               #
// #################################################################################################



 it('Adicina Permissão para o usuario teste14076@sharklasers.com', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

   it('Adiciona Permição dO USUARIO', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica em Usuario/Grupo
  cy.get('.default-padding.ng-scope > .permission-select > [ng-show="showUser"] > .column > .multiselect > .border > .ui-select-match > .btn-default')
  .should('be.visible')
  .click({ force: true });

// Digita teste14076@sharklasers.com
cy.get('.permission-select input.ui-select-search:visible', { timeout: 10000 })
  .first()
  .type('teste14076@sharklasers.com', { force: true });

// Seleciona a opção teste14076@sharklasers.com
  cy.contains('.ui-select-choices-row:visible span.ng-binding', 'teste14076@sharklasers.com', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

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

              it('Entra no perfil adicinonado "', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno em portugues', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

      it('Vai até a vitrine e Verefica se a está disponivel para o Usuario', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Verefica se a vitrine está aberta
cy.get('li[ng-if="breadcrumb.showcaseNameRoute"]', { timeout: 10000 })
  .should('contain.text', 'Vitrine Espanhol Cypress');

     });

              it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        

    });

             it('Entra em outro perfil que nao foi adionado', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("pessoa2@mailto.plus");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

      it('Verefica que a vitrine nao estreja disponivel pro perfil aluno', () => {
        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

  cy.wait(2000);

    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');


     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

     it('Não exibe a vitrine para usuário nao adicionado', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });

       it('Troca para pro idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)

    });

      it('Exclui a Permissão de usuario ', () => {
        
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

        it('Clica no botão de editar vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

  // Continuação do seu teste aqui
})

  it('Exclui Permição', () => {

    cy.wait(4000);

        //Clica em Permissões
        cy.get('a[ui-sref="accessLink.content.showcases.edit.id.permissions"]', { timeout: 10000 })
        .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000)

  //Clica na lixeira para excluir a pemissão de grupo (Grupo - 2)
  cy.get('tr.ng-scope > :nth-child(4) > .middle > .btn')
  .should('be.visible')
  .click({ force: true });

  cy.wait(2000);

    //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(5000);

       });

  it('Entra no perfil adiciondo anteriormente e verifica que a vitrinenao esteja mais diponivel', () => {
        
    cy.visit("https://hml.lector.live/lector_suporte/subscribe/login");
    cy.contains("button", "Entrar").click();

    cy.get('form.ng-pristine > [type="text"]', { timeout: 60000 })
      .should("be.visible")
      .type("teste14076@sharklasers.com");

    cy.get("ng-transclude > .border", { timeout: 60000 })
      .should("be.visible")
      .type("123");

    cy.get("#btn-entrar", { timeout: 60000 }).should("be.visible").click();

    cy.wait(10000);

    // opcional: garante que saiu da tela de login
    cy.url({ timeout: 60000 }).should("not.include", "/subscribe/login");

     });

       it('Troca para pro idioma Espanhol', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Espanhol
cy.contains('#languageOptions .ui-select-choices-row', /^Español$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

       it('Verefica que a vitrine nestá mais visivel pro usuario', () => {

  cy.wait(8000);

  cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true });

  // Passa o mouse pela Primeira Vitrine
  cy.contains('span', 'Primeira Vitrine', { timeout: 20000 })
    .should('be.visible')
    .closest('button')
    .trigger('mouseenter', { force: true });

  // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Espanhol Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Espanhol Cypress')
    .should('not.exist');

    });
                 it('Troca para p idioma Portugues', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Portugues
cy.contains('#languageOptions .ui-select-choices-row', /^Português$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)

    });


 // #################################################################################################
// #                                                                                               #
// #                         TESTE DE CATEGORIA                          #
// #                                                                                               #
// #################################################################################################


      it('Entra no perfil administrador', () => {
        
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
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Espanhol Cypress'))
        .find('button[ng-click="editShowcase(showcase)"]:visible').length > 0

      if (editarDisponivel) {
        cy.contains('tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).within(() => {
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

it('Colaca a vitrine em outra categoria', () => {

  //Clica no "X" tirar a categortia
  cy.get(':nth-child(2) > :nth-child(3) > .multiselect > .border > .ui-select-match > .btn-default > .btn')
    .should('be.visible')
    .click({ force: true });

    cy.wait(1000);

    //Clica na Categoria
    cy.get(':nth-child(2) > :nth-child(3) > .multiselect > .border > .ui-select-match > .btn-default')
    .should('be.visible')
    .click({ force: true });
    
    // Clica na categoria /LECTOR (Não mexer)
cy.get('.ui-select-choices:visible', { timeout: 10000 })
  .contains('.ui-select-choices-row', '/LECTOR (Não mexer)')
  .should('be.visible')
  .click({ force: true })

      //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.wait(3000)

    });

    it('Verifica que a vitrine não está na categoria', () => {
  cy.contains('table tbody tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).should('not.exist')
})

it('Clica na categoria LECTOR (Não mexer) e verifica se aparece a vitrine nesta categoria', () => {

  const abrirCategoriaLector = (tentativa = 1) => {
    cy.contains('span.text-area', 'LECTOR (Não mexer)', { timeout: 60000 }).should('be.visible').click({ force: true })
    cy.wait(1000)

    cy.get('body').then(($body) => {
      const apareceu = $body.find('div.ng-binding:contains("BANNER 2906"):visible').length > 0

      if (!apareceu && tentativa < 7) {
        abrirCategoriaLector(tentativa + 1)
      }
    })
  }

  abrirCategoriaLector()

  cy.contains('div.ng-binding', 'BANNER 2906', { timeout: 60000 }).should('be.visible')
})

      it('Verifica que a vitrine está na categoria', () => {

        cy.contains('table tbody div.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 60000 })
  .should('be.visible')

  });

it('Joga a vitrine pra categoria todos', () => {

  cy.contains('table tbody tr', 'Vitrine Espanhol Cypress', { timeout: 60000 })
  .should('be.visible')
  .within(() => {
    cy.get('button.icon-edit').should('be.visible').click({ force: true })
  })

  cy.wait(1000);

    //Clica no "X" tirar a categortia
  cy.get(':nth-child(2) > :nth-child(3) > .multiselect > .border > .ui-select-match > .btn-default > .btn')
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
  cy.contains('table tbody tr', 'Vitrine Espanhol Cypress', { timeout: 10000 }).should('not.exist')

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

        cy.contains('table tbody div.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 60000 })
        .scrollIntoView()
        .should('be.visible') 

  });

  it('Joga a vitrine novamente pra categoria Primeira Vitrine Cypress', () => {

  cy.contains('table tbody tr', 'Vitrine Espanhol Cypress', { timeout: 60000 })
  .scrollIntoView()
  .should('be.visible')
  .within(() => {
    cy.get('button.icon-edit').should('be.visible').click({ force: true })
  })

   cy.wait(1000);
   
})
   

it('Clica na categoria Primeira Vitrine Cypress', () => {

        //Clica na Categoria
    cy.get(':nth-child(2) > :nth-child(3) > .multiselect > .border > .ui-select-match > .btn-default')
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
    const apareceu = $body.find('table tbody div.ng-binding:contains("Vitrine Espanhol Cypress"):visible').length > 0

    if (!apareceu && tentativa < 3) abrirPrimeiraVitrine(tentativa + 1)
  })
}

abrirPrimeiraVitrine()

cy.contains('table tbody div.ng-binding', 'Vitrine Espanhol Cypress', { timeout: 60000 }).should('be.visible')

     });


   });

  });




