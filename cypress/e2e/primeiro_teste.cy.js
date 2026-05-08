describe('Login no SauceDemo', () => {

  beforeEach(() => {

    // Acessa a aplicação antes de cada teste
    cy.visit('https://www.saucedemo.com')

  })

  it('Deve realizar login com sucesso', () => {

    // Valida se a tela de login carregou corretamente
    cy.get('.login_logo')
      .should('be.visible')
      .and('contain', 'Swag Labs')

    // Preenche usuário
    cy.get('[data-test="username"]')
      .should('be.visible')
      .type('standard_user')

    // Preenche senha
    cy.get('[data-test="password"]')
      .should('be.visible')
      .type('secret_sauce', { log: false })

    // Realiza login
    cy.get('[data-test="login-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click()

    // Valida se o usuário foi redirecionado para a home
    cy.url()
      .should('include', '/inventory.html')

    // Valida título da página
    cy.get('.title')
      .should('be.visible')
      .and('have.text', 'Products')

    // Valida se os produtos foram carregados
    cy.get('.inventory_item')
      .should('have.length', 6)

    // Valida informações do primeiro produto
    cy.get('.inventory_item')
      .first()
      .within(() => {

        cy.get('.inventory_item_name')
          .should('contain', 'Sauce Labs Backpack')

        cy.get('.inventory_item_price')
          .should('be.visible')

        cy.get('button')
          .should('contain', 'Add to cart')
          .and('be.visible')

      })

  })

})