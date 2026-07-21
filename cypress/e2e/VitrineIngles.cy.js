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
    input.value = 'Vitrine Ingles Cypress';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

  });

  //Clica em idiomas
  cy.get(':nth-child(2) > :nth-child(2) > .multiselect > .border > :nth-child(1) > .ui-select-search')
  .should('be.visible')
  .click(); 

  //Portugues
  cy.get('#ui-select-choices-row-36-1')
  .should('be.visible')
  .click();

  });

it('INSERE AS CORES DA VITRINE', () => {
  function preencherCor(nomeCampo, cor) {
    const seletorCampo = new RegExp(`^${nomeCampo}$`, 'i')

    cy.contains('.box-title', seletorCampo, {
      timeout: 20000
    })
      .should('exist')
      .closest('.box')
      .find('input[colorpicker]')
      .should('exist')
      .then(($input) => {
        const input = $input[0]
        const win = input.ownerDocument.defaultView

        const setterValor = Object.getOwnPropertyDescriptor(
          win.HTMLInputElement.prototype,
          'value'
        ).set

        input.focus()

        setterValor.call(input, cor)

        input.dispatchEvent(
          new win.Event('input', {
            bubbles: true
          })
        )

        input.dispatchEvent(
          new win.Event('change', {
            bubbles: true
          })
        )

        input.dispatchEvent(
          new win.Event('blur', {
            bubbles: true
          })
        )
      })

    // O campo possui debounce de 500ms
    cy.wait(1000)

    cy.contains('.box-title', seletorCampo)
      .closest('.box')
      .find('input[colorpicker]')
      .should('have.value', cor)

    cy.log(`${nomeCampo}: ${cor}`)
  }

  // Cor principal das fontes
  preencherCor(
    'COR DA FONTE',
    '#000000'
  )

  // Cor de fundo da vitrine
  preencherCor(
    'COR DE FUNDO',
    '#1e790a'
  )

  // Cor dos títulos
  preencherCor(
    'COR DA FONTE DE TÍTULOS',
    '#000000'
  )

  // Cor das fontes secundárias
  preencherCor(
    'COR DA FONTE SECUNDÁRIA',
    '#0ef6ff'
  )
})
 
    it('Adiciona a pesquisa', () => {

        //Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em pesquisa
cy.get('#new-showcase-item-options > [ng-if="showcase.theme === \'THEME_DEFAULT\'"]')
.should('be.visible')
.click();
    
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

  //Clica em salvar novamente
  cy.get('.between > .flex.ng-scope > .btn-swipe-accent')
  .should('be.visible')
  .click();

  // Verifica se o banner foi carregado
cy.get('.banner-container', { timeout: 10000 })
  .should('be.visible');

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
    input.value = 'Título Automação Cypress INGLES';

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
    input.value = 'Descrição Automação Cypress INGLES';

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
     
       it('Adiciona a Trilha', () => {

// Abre o select da trilha
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha uma trilha')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('breadcrumb teste 0206', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', 'breadcrumb teste 0206', { timeout: 10000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

   it('Adiciona Treinamento', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > [ng-show="modal.editCarousel"]')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica em treinamento
        cy.get('.open > .ui-select-choices > :nth-child(2)')
        .should('be.visible')
        .click();

// Abre o select da trilha
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha um treinamento')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('8686', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', '8686', { timeout: 10000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

  it('Adiciona Categoria de Trilhas', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica na categoria de trilha
        cy.get('.open > .ui-select-choices > :nth-child(3)')
        .should('be.visible')
        .click();

// Abre o select da trilha
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha uma categoria')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('0000Teste', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', '0000Teste', { timeout: 10000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

    it('Adiciona Categoria de Treinamento', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica na categoria de trilha
        cy.get('.open > .ui-select-choices > :nth-child(4)')
        .should('be.visible')
        .click();

// Abre o select da trilha
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha uma categoria')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('00000Teste', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', '00000Teste', { timeout: 10000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

    it('Adiciona um Vídeo', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica no video
        cy.get('.open > .ui-select-choices > :nth-child(5)')
        .should('be.visible')
        .click();

// Título do vídeo
cy.get('input[placeholder="Insira o título do vídeo"]', { timeout: 10000 })
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Vídeo Automação';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

// Link do vídeo
cy.get('input[placeholder="Insira o link do vídeo"]', { timeout: 10000 })
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'https://www.youtube.com/watch?v=dkcaiI78VX4';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

    it('Adiciona Documento', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('[ng-if="!modal.editDiagnostic"] > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica no documento
        cy.get('.open > .ui-select-choices > :nth-child(6)')
        .should('be.visible')
        .click();

// Abre o select de documento
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha um documento')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('Blumenau_vista', { force: true });

// Aguarda e seleciona o resultado
cy.contains('span.ui-select-highlight', 'Blumenau_vista', { timeout: 60000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });
  
    it('Adiciona um diretorio de documento', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica no diretorio
        cy.get('.open > .ui-select-choices > :nth-child(7)')
        .should('be.visible')
        .click();

// Abre o select de documento
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha um documento')
  .click({ force: true });

  // Fecha o dropdown de tipo, se estiver aberto
cy.get('body').type('{esc}');

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('Thiago', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', 'Thiago', { timeout: 60000 })
  .first()
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

    it('Adiciona uma gravação', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica no diretorio
        cy.get('.open > .ui-select-choices > :nth-child(8)')
        .should('be.visible')
        .click();

// Abre o select de gravação
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha uma gravação')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('Thiago', { force: true });

// Aguarda e seleciona o resultado
  cy.contains('.ui-select-choices-row:visible', '12/06/2026 teste thiago', { timeout: 10000 })
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();
    
  });

   it('Adiciona uma categoria degravação', () => {

    cy.wait(1000);

        //Abre os seletores
        cy.get('.add-content > :nth-child(1) > .ng-touched')
        .should('be.visible')
        .click();

        cy.wait(1000);

        //Clica no diretorio
        cy.get('.open > .ui-select-choices > :nth-child(9)')
        .should('be.visible')
        .click();

// Abre o select de documento
cy.get('.modal')
  .contains('span.ui-select-placeholder', 'Escolha uma categoria')
  .click({ force: true });

// Digita no input real do ui-select
cy.get('.modal input.ui-select-search:visible', { timeout: 10000 })
  .clear({ force: true })
  .type('Categoria 2', { force: true });

// Aguarda e seleciona o resultado
cy.contains('.ui-select-choices-row:visible', 'Categoria 2', { timeout: 60000 })
  .first()
  .click({ force: true });

  //Clica em adicionar
  cy.get('.center > .btn-swipe-accent')
  .should('be.visible')
  .click();

  //Clica em Salvar
  cy.get('[ng-click="saveCarousel()"]')
  .scrollIntoView()
  .click();

    });

    it('Adiciona Rich Text', () => {

//Clica em adicionar
cy.get('.btn-icon')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em adicionar Rich Text
cy.get('[ng-click="addRichText();"]')
.should('be.visible')
.click();

cy.wait(4000);

// Escreve texto no rich text
const texto = 'Texto de teste no Rich Text';

// Aguarda a animação da modal/editor terminar
cy.wait(1000); 

cy.get('iframe.cke_wysiwyg_frame', { timeout: 15000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .click({ force: true }) // O force: true ignora checagens acionáveis do DOM se ele estiver mudando
  .clear()
  .type(texto, { delay: 0 });

  //Clica na foto
cy.get('#cke_40')
.should('be.visible')
.click();

cy.wait(1000);

//Clica em enviar
cy.get('#cke_Upload_353')
.should('be.visible')
.click();

cy.wait(2000);

// Exemplo: arquivo dentro de cypress/fixtures
const arquivo = 'cypress/fixtures/logo2.jpg';

// Garante que a janela do CKEditor está aberta
cy.get('.cke_dialog', { timeout: 10000 })
  .should('be.visible');

// Envia o arquivo no input file dentro do iframe
cy.get('.cke_dialog iframe.cke_dialog_ui_input_file', { timeout: 10000 })
  .should('be.visible')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .find('input[type="file"]')
  .selectFile(arquivo, { force: true });

// Clica em "Enviar para o Servidor"
cy.get('.cke_dialog')
  .contains('a, button, span, input', 'Enviar para o Servidor', { timeout: 10000 })
  .click({ force: true });

  cy.wait(3000);

function preencherCampoImagem(nomeCampo, valor) {
  cy.get('.cke_dialog:visible', { timeout: 10000 })
    .contains('label', new RegExp(`^${nomeCampo}$`))
    .then(($label) => {
      const inputId = $label.attr('for');
      const labelId = $label.attr('id');

      if (inputId) {
        cy.get('.cke_dialog:visible')
          .find(`#${inputId}`)
          .clear({ force: true })
          .type(valor, { force: true });
      } else {
        cy.get('.cke_dialog:visible')
          .find(`input[aria-labelledby="${labelId}"]`)
          .clear({ force: true })
          .type(valor, { force: true });
      }
    });
}

// Preenche largura e altura
preencherCampoImagem('Largura', '200');
preencherCampoImagem('Altura', '200');
  cy.wait(1000);

  //Clica em Ok
  cy.get('#cke_355_label')
  .should('be.visible')
  .click();

  cy.wait(1000);

  //Clica em Salvar
  cy.get('.mt-20 > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(2000);

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

     it('Verefica que a vitrine não está disponivel no idoma portugues ', () => {

        cy.wait(7000);

        cy.contains('button.showcase-navigation', 'Explorar', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();


    // Verifica que a vitrine não está disponível para o usuário
  cy.get('#showcaseNavigation2026', { timeout: 10000 })
    .should('be.visible')
    .and('not.contain.text', 'Vitrine Ingles Cypress');

  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Ingles Cypress')
    .should('not.exist');

    });

    it('Troca para p idioma Ingles', () => {

        //Clica no icon no no cabeçalho
        cy.get('#languageSelectorButton', { timeout: 60000 }).should('be.visible').click({ force: true })

        //Clica em Ingles
cy.contains('#languageOptions .ui-select-choices-row', /^English$/, { timeout: 10000 })
  .should('be.visible')
  .click({ force: true })

  cy.wait(8000)
        
    });

         it('Verifica se a vitrine está disponivel na visão publca em ingles', () => {

        cy.wait(2000);

        cy.contains('button.showcase-navigation', 'Explore', { timeout: 60000 })
  .should('be.visible')
  .click({ force: true });

        //Vai até a vitrine
        cy.contains('span', 'Primeira Vitrine')
  .closest('button')
  .click();

 //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Ingles Cypress', { timeout: 10000 })
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

  const tituloVitrine = 'Título Automação Cypress INGLES';
const descricaoVitrine = 'Descrição Automação Cypress INGLES';

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

    
    it("Loga novamente no perfil Administrador", () => {

    cy.wait(3000);

    //Clica em entrar
     cy.contains('button.btn-swipe-accent', 'Sign In')
  .should('be.visible')
  .click({ force: true })

    cy.wait(3000)

// Preenche e realiza o login dentro do popup
cy.get('.popup.popped')
  .should('be.visible')
  .within(() => {
    cy.get('input[ng-model="credentials.username"]')
      .should('be.visible')
      .clear()
      .type('qualidade2@lectortec.com.br')

    cy.get('#login_password_navbar')
      .should('be.visible')
      .clear()
      .type('2006lrnrgr', { log: false })

    cy.contains('button[ng-click="login()"]', 'Sign In')
      .should('be.visible')
      .click()
      cy.wait(10000)

  });

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

            it('Clica na vitrine', () => {
  const clicarEditarVitrine = (tentativa = 1) => {
    cy.get('body').then(($body) => {
      const editarDisponivel = $body.find('tr')
        .filter((_, tr) => Cypress.$(tr).text().includes('Vitrine Portugues Cypress'))
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

  // Continuação do seu teste aqui
})



      it('TROCA AS CORES DA VITRINE', () => { 
  function preencherCor(nomeCampo, cor) {
    const seletorCampo = new RegExp(`^${nomeCampo}$`, 'i')

    cy.contains('.box-title', seletorCampo, {
      timeout: 20000
    })
      .should('exist')
      .closest('.box')
      .find('input[colorpicker]')
      .should('exist')
      .then(($input) => {
        const input = $input[0]
        const win = input.ownerDocument.defaultView

        const setterValor = Object.getOwnPropertyDescriptor(
          win.HTMLInputElement.prototype,
          'value'
        ).set

        input.focus()

        setterValor.call(input, cor)

        input.dispatchEvent(
          new win.Event('input', {
            bubbles: true
          })
        )

        input.dispatchEvent(
          new win.Event('change', {
            bubbles: true
          })
        )

        input.dispatchEvent(
          new win.Event('blur', {
            bubbles: true
          })
        )
      })

    // O campo possui debounce de 500ms
    cy.wait(1000)

    cy.contains('.box-title', seletorCampo)
      .closest('.box')
      .find('input[colorpicker]')
      .should('have.value', cor)

    cy.log(`${nomeCampo}: ${cor}`)
  }

  // Cor principal das fontes
  preencherCor(
    'COR DA FONTE',
    '#ffffff'
  )

  // Cor de fundo da vitrine
  preencherCor(
    'COR DE FUNDO',
    '#5c0aa0'
  )

  // Cor dos títulos
  preencherCor(
    'COR DA FONTE DE TÍTULOS',
    '#000000'
  )

  // Cor das fontes secundárias
  preencherCor(
    'COR DA FONTE SECUNDÁRIA',
    '#0995d1'
  )

    // Cor das fontes secundárias
  preencherCor(
    'COR DE FUNDO DOS CARTÕES',
    '#bc75f6'
  )

})


 it('Edita a vitrine', () => {

      //Clica em editar no carrosel
      cy.get(':nth-child(3) > .actions > .actions-line > :nth-child(1) > .btn')
      .scrollIntoView()
  .click({ force: true });

const conteudosParaExcluir = [
  'Categoria de Trilhas',
  'Categoria de treinamentos',
  'Vídeo - Link',
  'Documento',
  'Diretório de documentos',
  'Gravações',
  'Categoria de gravações'
]

cy.wrap(conteudosParaExcluir).each((nome) => {
  return cy.contains(
    'table.carousel-contents:visible tbody tr',
    nome,
    {
      matchCase: false,
      timeout: 15000
    }
  )
    .should('exist')
    .scrollIntoView({ block: 'center' })
    .within(() => {
      cy.get('button[ng-click^="removeContent"]')
        .should('exist')
        .click({ force: true })
    })
    .then(() => {
      cy.wait(1500)
    })
})

cy.wait(2000);

//Escreve o título
cy.get('input[placeholder="Título"]')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Título EDITADO LECTOR INGLES';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

  cy.wait(1000);

cy.get('input[placeholder="Descrição"]')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Descrição EDITADA LECTOR INGLES';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

    //Clica em Salvar no carrosel
  cy.get('[ng-click="saveCarousel()"]')
  .scrollIntoView()
  .click();

  cy.wait(1000);

    //Salva a Vitrine
  cy.get('.open-content > .end > .btn-swipe-accent')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.wait(5000)
    
    });


  })
});