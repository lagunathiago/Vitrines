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

  context("Criando Treinamento", { testIsolation: false }, () => {
  
    /*
    it("Cria a categoria", () => {

      // Clicando na Vitrine
      cy.get('[title="Vitrines"] > .sideitem',{timeout:60000})
      .should('be.visible')
      .click();

      //Clica em criar Categoria
cy.get('span[title="Adicionar categoria"]', { timeout: 10000 })
  .first()
  .click({ force: true });

  cy.wait(2000);

  //Escreve
cy.get('input[placeholder="Nova categoria"]', { timeout: 10000 })
  .should('exist')
  .then(($input) => {
    const input = $input[0];

    input.removeAttribute('disabled');
    input.focus();
    input.value = 'Primeira Vitrine Cypress';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });

  //Confirma
  cy.get('[switch="modal.createCategory"] > .modal > :nth-child(2) > .modal-form > .end > .btn-swipe-accent')
  .should('be.visible')
  .click();

  cy.wait(2000);

  //Clica na categoria criada
  cy.get('span.text-area[title="Primeira Vitrine Cypress"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

  cy.wait(1000)

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
    input.value = 'Primeira Vitrine Automação Cypress';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

  });

  //Clica em idiomas
  cy.get(':nth-child(2) > :nth-child(2) > .multiselect > .border > :nth-child(1) > .ui-select-search')
  .should('be.visible')
  .click(); 

  //Portugues
  cy.get('#ui-select-choices-row-36-0')
  .should('be.visible')
  .click();

  cy.document().then((doc) => {
  const aviso = doc.createElement('div');

  aviso.id = 'aviso-pause';
  aviso.innerHTML = '⚠️ INSIRA A COR DE FUNDO/FONTE/FONTE DE TÍTULOS/FONTE SECUNDÁRIA/BORDA DOS CARTÕES!';
  aviso.style.position = 'fixed';
  aviso.style.top = '20px';
  aviso.style.left = '50%';
  aviso.style.transform = 'translateX(-50%)';
  aviso.style.background = 'red';
  aviso.style.color = 'white';
  aviso.style.padding = '20px';
  aviso.style.fontSize = '24px';
  aviso.style.fontWeight = 'bold';
  aviso.style.zIndex = '999999';

  doc.body.appendChild(aviso);
});

cy.pause();

// Quando clicar em Resume, o teste continua daqui
cy.document().then((doc) => {
  doc.getElementById('aviso-pause')?.remove();
    });

  });

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

it('Adiciona o Banner', () => {

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
  .selectFile('cypress/fixtures/banner61.jpg', { force: true });

function mostrarAvisoCorteBanner() {
  cy.document().then((doc) => {
    doc.getElementById('aviso-pause')?.remove();

    const aviso = doc.createElement('div');

    aviso.id = 'aviso-pause';
    aviso.innerHTML = '⚠️ SELECIONE A ÁREA DO CORTE PARA O BANNER!';
    aviso.style.position = 'fixed';
    aviso.style.top = '20px';
    aviso.style.left = '50%';
    aviso.style.transform = 'translateX(-50%)';
    aviso.style.background = 'red';
    aviso.style.color = 'white';
    aviso.style.padding = '20px';
    aviso.style.fontSize = '24px';
    aviso.style.fontWeight = 'bold';
    aviso.style.zIndex = '999999';

    doc.body.appendChild(aviso);
  });
}

function removerAvisoCorteBanner() {
  cy.document().then((doc) => {
    doc.getElementById('aviso-pause')?.remove();
  });
}

mostrarAvisoCorteBanner();

cy.pause();

removerAvisoCorteBanner();

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
    input.value = 'Título Automação Cypress';

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
    input.value = 'Descrição criada pela automação Cypress';

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
const arquivo = 'cypress/fixtures/lectorlogo.png';

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

    it('Verifica é apresentada na categoria', () => {

            const nomeVitrine = 'Primeira Vitrine Automação Cypress';

cy.contains('table.showcase-table tbody tr', nomeVitrine, { timeout: 20000 })
  .scrollIntoView()
  .should('be.visible');
        
    })

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

  //Vai até a vitrine criada
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Primeira Vitrine Aut', { timeout: 10000 })
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

  const tituloVitrine = 'Título Automação Cypress';
const descricaoVitrine = 'Descrição criada pela automação Cypress';

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

  */
  it("Troca pro perfil Administrador", () => {

    cy.wait(3000);

     //Clioca no icon
    cy.get('#user-options-btn > .icon-profile', {timeout: 60000})
    .should('be.visible')
    .click()

    cy.wait(2000)

    //Clica em selecionar perfil
  cy.contains('.menu-option', 'Selecionar perfil', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

      cy.wait(2000)

  //Clica em Administrador
  cy.contains('span', 'Administrador - Todos', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });
  
      cy.wait(7000)

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



    });



    



  });

});
