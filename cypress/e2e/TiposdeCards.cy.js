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
  
    /*
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
    input.value = 'Vitrine Cards Cy';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });
});

it('Adiciona todos os tipos de cartões', () => {

  function adicionarCartao(indice, nome) {

    // Clica no botão de adicionar
    cy.get('.btn-icon', { timeout: 15000 })
      .scrollIntoView()
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true })

    cy.wait(500)

    // Clica em adicionar carrossel
    cy.get('[ng-click="addCarousel();"]', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    // Aguarda o modal Criar Carrossel
    cy.get('.modal:visible', { timeout: 15000 })
      .should('exist')

      cy.wait(1000)

//Flega o título
cy.get(':nth-child(1) > .flex > .checkbox > .icon-checkbox')
.should('be.visible')
.click();

  cy.wait(1000)

    // Escreve o título do carrossel
    cy.get('.modal:visible input[placeholder="Título"]')
      .then(($input) => {
        const input = $input[0]

        input.removeAttribute('disabled')
        input.focus()
        input.value = nome

        input.dispatchEvent(new Event('input', { bubbles: true }))
        input.dispatchEvent(new Event('change', { bubbles: true }))
        input.dispatchEvent(new Event('blur', { bubbles: true }))
      })

    // Abre a seleção dos modelos de card
    cy.get('.modal:visible .mt-20 > .middle > .btn', {
      timeout: 20000
    })
      .should('be.visible')
      .click({ force: true })

    // Aguarda a tela Escolher tema
    cy.contains('.modal:visible', 'Escolher tema', {
      timeout: 20000
    })
      .should('exist')

    // Escolhe o modelo de card pelo índice
    cy.get('.modal:visible .showcase-card-container', {
      timeout: 20000
    })
      .should('have.length.at.least', 17)
      .eq(indice)
      .scrollIntoView({
        block: 'center',
        duration: 500
      })
      .should('exist')
      .click({ force: true })

    // Aguarda retornar ao modal Criar Carrossel
    cy.contains('.modal:visible', 'Criar Carrossel', {
      timeout: 20000
    })
      .should('exist')

    cy.wait(500)

    // Abre o primeiro seletor, que começa como Trilha
    cy.get(
      '.modal:visible .add-content > :nth-child(1) > [ng-show="modal.editCarousel"]',
      { timeout: 20000 }
    )
      .should('be.visible')
      .click({ force: true })

    // Seleciona Categoria de Trilhas
    cy.contains(
      '.ui-select-choices-row:visible',
      'Categoria de Trilhas',
      { timeout: 30000 }
    )
      .should('be.visible')
      .click({ force: true })

    // Abre o seletor da categoria
    cy.get('.modal:visible')
      .contains(
        'span.ui-select-placeholder',
        'Escolha uma categoria',
        { timeout: 30000 }
      )
      .should('be.visible')
      .click({ force: true })

    // Pesquisa a categoria
    cy.get('.modal:visible input.ui-select-search:visible', {
      timeout: 30000
    })
      .clear({ force: true })
      .type('0000Teste', { force: true })

    // Seleciona a categoria encontrada
    cy.contains(
      '.ui-select-choices-row:visible',
      '0000Teste',
      { timeout: 30000 }
    )
      .should('be.visible')
      .click({ force: true })

    // Adiciona Categoria de Trilhas ao carrossel
    cy.get('.modal:visible .center > .btn-swipe-accent')
      .should('be.visible')
      .click({ force: true })

    // Confirma que o conteúdo entrou na tabela
    cy.get('.modal:visible table tbody')
      .should('contain.text', 'Categoria de Trilhas')
      .and('contain.text', '0000Teste')

    // Salva o carrossel atual
    cy.get('.modal:visible [ng-click="saveCarousel()"]')
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true })

    // Aguarda fechar antes de criar o próximo
    cy.get('.modal:visible', { timeout: 20000 })
      .should('not.exist')

    cy.log(`${nome} adicionado com sucesso`)
    cy.wait(800)
  }

  const cartoes = [
    { indice: 0, nome: 'Simples 1' },
    { indice: 1, nome: 'Simples 2' },
    { indice: 2, nome: 'Simples 3' },
    { indice: 3, nome: 'Simples 4' },
    { indice: 4, nome: 'Simples 5' },

    { indice: 5, nome: 'Completo 1' },
    { indice: 6, nome: 'Completo 2' },
    { indice: 7, nome: 'Completo 3' },
    { indice: 8, nome: 'Completo 4' },
    { indice: 9, nome: 'Completo 5' },

    { indice: 10, nome: 'Avançado 1' },
    { indice: 11, nome: 'Avançado 2' },
    { indice: 12, nome: 'Avançado 3' },
    { indice: 13, nome: 'Avançado 4' },
    { indice: 14, nome: 'Avançado 5' },
    { indice: 15, nome: 'Avançado 6' },
    { indice: 16, nome: 'Avançado 7' }
  ]

  cy.wrap(cartoes).each((cartao) => {
    adicionarCartao(cartao.indice, cartao.nome)
  })
      })


       it('Adiciona Permição', () => {

        cy.wait(3000);

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
*/


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
  cy.contains('#showcaseNavigation2026 span.ng-binding', 'Vitrine Cards Cy', { timeout: 10000 })
  .should('be.visible')
  .parents('button.menu-open-showcase')
  .first()
  .click({ force: true });

      });

      it('Valida os títulos dos carrosséis e dos cards', () => {
  const titulosCarrosseisEsperados = [
    'Simples 1',
    'Simples 2',
    'Simples 3',
    'Simples 4',
    'Simples 5',

    'Completo 1',
    'Completo 2',
    'Completo 3',
    'Completo 4',
    'Completo 5',

    'Avançado 1',
    'Avançado 2',
    'Avançado 3',
    'Avançado 4',
    'Avançado 5',
    'Avançado 6',
    'Avançado 7'
  ]

  const titulosCardsEsperados = [
    'Teste 21/01/2026',
    '2º Curso de Extensão em Teoria Geral do Direito: Formação do Pensamento Intelectual Brasileiro',
    'teste 17022t',
    'Teste 1702',
    'Teste 1702 Impedir',
    'Teste Gerenciar'
  ]

  const seletorTituloCarrossel =
    '.showcase-title span[ng-show="item.showTitle"]'

  const carrosseisValidados = new Set()

  let janela
  let elementoRolavel

  function limparTexto(texto) {
    return String(texto || '')
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  function normalizarTexto(texto) {
    return limparTexto(texto)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const carrosseisPorNomeNormalizado = new Map(
    titulosCarrosseisEsperados.map((titulo) => [
      normalizarTexto(titulo),
      titulo
    ])
  )

  function localizarElementoRolavel(win) {
    const documento = win.document

    const candidatos = [
      documento.scrollingElement,
      documento.documentElement,
      documento.body,
      ...documento.querySelectorAll('body *')
    ].filter((elemento, indice, lista) => {
      return elemento && lista.indexOf(elemento) === indice
    })

    const elementosRolaveis = candidatos
      .map((elemento) => {
        const estilo = win.getComputedStyle(elemento)

        const distanciaRolagem =
          elemento.scrollHeight - elemento.clientHeight

        const permiteRolagem =
          elemento === documento.scrollingElement ||
          elemento === documento.documentElement ||
          elemento === documento.body ||
          estilo.overflowY === 'auto' ||
          estilo.overflowY === 'scroll'

        return {
          elemento,
          distanciaRolagem,
          permiteRolagem
        }
      })
      .filter((item) => {
        return (
          item.permiteRolagem &&
          item.distanciaRolagem > 100
        )
      })
      .sort((itemA, itemB) => {
        return (
          itemB.distanciaRolagem -
          itemA.distanciaRolagem
        )
      })

    return (
      elementosRolaveis[0]?.elemento ||
      documento.scrollingElement ||
      documento.documentElement ||
      documento.body
    )
  }

  function extrairTitulosDosCards($carrossel) {
    return $carrossel
      .find('.showcase-card-title')
      .toArray()
      .map((elemento) => {
        return limparTexto(
          elemento.getAttribute('title') ||
          elemento.textContent
        )
      })
      .filter(Boolean)
  }

  function validarCardsDoCarrossel(
    elementoTitulo,
    tituloCarrossel
  ) {
    const $titulo = Cypress.$(elementoTitulo)

    const $carrossel = $titulo
      .closest('.showcase-item')
      .first()

    expect(
      $carrossel.length,
      `Container do carrossel "${tituloCarrossel}"`
    ).to.equal(1)

    const titulosCardsEncontrados =
      extrairTitulosDosCards($carrossel)

    expect(
      titulosCardsEncontrados.length,
      `Quantidade de cards no carrossel "${tituloCarrossel}"`
    ).to.be.greaterThan(0)

    titulosCardsEsperados.forEach(
      (tituloCardEsperado) => {
        const esperadoNormalizado =
          normalizarTexto(tituloCardEsperado)

        const cardEncontrado =
          titulosCardsEncontrados.some(
            (tituloCardEncontrado) => {
              const encontradoNormalizado =
                normalizarTexto(tituloCardEncontrado)

              return (
                encontradoNormalizado ===
                  esperadoNormalizado ||
                encontradoNormalizado.includes(
                  esperadoNormalizado
                ) ||
                esperadoNormalizado.includes(
                  encontradoNormalizado
                )
              )
            }
          )

        expect(
          cardEncontrado,
          `O card "${tituloCardEsperado}" deve existir em "${tituloCarrossel}"`
        ).to.equal(true)
      }
    )

    Cypress.log({
      name: 'Carrossel validado',
      message: `${tituloCarrossel} — ${titulosCardsEncontrados.length} cards`
    })
  }

  function validarCarrosseisCarregados() {
    return cy.get('body', { log: false }).then(($body) => {
      const elementosTitulos = $body
        .find(seletorTituloCarrossel)
        .toArray()

      elementosTitulos.forEach((elementoTitulo) => {
        const tituloEncontrado =
          limparTexto(elementoTitulo.textContent)

        const tituloNormalizado =
          normalizarTexto(tituloEncontrado)

        const tituloEsperado =
          carrosseisPorNomeNormalizado.get(
            tituloNormalizado
          )

        const jaFoiValidado =
          carrosseisValidados.has(tituloNormalizado)

        if (!tituloEsperado || jaFoiValidado) {
          return
        }

        expect(
          tituloEncontrado,
          `Título do carrossel "${tituloEsperado}"`
        ).to.equal(tituloEsperado)

        validarCardsDoCarrossel(
          elementoTitulo,
          tituloEsperado
        )

        carrosseisValidados.add(tituloNormalizado)
      })
    })
  }

  function obterCarrosseisFaltantes() {
    return titulosCarrosseisEsperados.filter(
      (titulo) => {
        return !carrosseisValidados.has(
          normalizarTexto(titulo)
        )
      }
    )
  }

  function descerEValidar(tentativa = 0) {
    const limiteTentativas = 250

    if (tentativa >= limiteTentativas) {
      throw new Error(
        `Limite de rolagens atingido. Carrosséis não encontrados: ${obterCarrosseisFaltantes().join(', ')}`
      )
    }

    return validarCarrosseisCarregados().then(() => {
      if (
        carrosseisValidados.size ===
        titulosCarrosseisEsperados.length
      ) {
        cy.log(
          `Todos os ${titulosCarrosseisEsperados.length} carrosséis foram validados`
        )

        return
      }

      if (
        !elementoRolavel ||
        !elementoRolavel.isConnected
      ) {
        elementoRolavel =
          localizarElementoRolavel(janela)
      }

      const posicaoAnterior =
        elementoRolavel.scrollTop

      const limiteAtual =
        elementoRolavel.scrollHeight -
        elementoRolavel.clientHeight

      const novaPosicao = Math.min(
        posicaoAnterior + 300,
        limiteAtual
      )

      elementoRolavel.scrollTop = novaPosicao

      elementoRolavel.dispatchEvent(
        new janela.Event('scroll', {
          bubbles: true
        })
      )

      return cy.wait(800).then(() => {
        const posicaoAtual =
          elementoRolavel.scrollTop

        const novoLimite =
          elementoRolavel.scrollHeight -
          elementoRolavel.clientHeight

        const chegouAoFinal =
          posicaoAtual >= novoLimite - 5

        const naoSeMoveu =
          posicaoAtual === posicaoAnterior

        if (chegouAoFinal && naoSeMoveu) {
          return cy
            .wait(2000)
            .then(() => validarCarrosseisCarregados())
            .then(() => {
              const faltantes =
                obterCarrosseisFaltantes()

              if (faltantes.length > 0) {
                throw new Error(
                  `Chegou ao final da página. Carrosséis não encontrados: ${faltantes.join(', ')}`
                )
              }
            })
        }

        return descerEValidar(tentativa + 1)
      })
    })
  }

  // Aguarda o primeiro carrossel
  cy.contains(
    seletorTituloCarrossel,
    'Simples 1',
    { timeout: 60000 }
  ).should('exist')

  // Localiza o elemento responsável pela rolagem
  cy.window({ log: false })
    .then((win) => {
      janela = win
      elementoRolavel =
        localizarElementoRolavel(win)

      // Volta ao início da vitrine
      elementoRolavel.scrollTop = 0

      elementoRolavel.dispatchEvent(
        new win.Event('scroll', {
          bubbles: true
        })
      )
    })
    .wait(1000)
    .then(() => {
      return descerEValidar()
    })
})


it('Automação finalizada', () => {

    cy.document().then((doc) => {
  const mensagemAnterior = doc.getElementById('automacao-finalizada')

  if (mensagemAnterior) {
    mensagemAnterior.remove()
  }

  const mensagem = doc.createElement('div')

  mensagem.id = 'automacao-finalizada'
  mensagem.innerHTML = `
    <div style="font-size: 42px; margin-bottom: 12px;">🎉✅🚀</div>
    <div>Automação finalizada com sucesso!</div>
  `

  Object.assign(mensagem.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999999',
    background: '#ffffff',
    color: '#1f2937',
    padding: '35px 55px',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.30)',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  })

  doc.body.appendChild(mensagem)
})

cy.wait(5000)

    })
   })
  })


