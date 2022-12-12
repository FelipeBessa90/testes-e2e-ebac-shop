/// <reference types="cypress" />
var faker = require('faker-br');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br')
    });
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4
        let nomefaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailfaker = faker.internet.email(nomefaker, sobrenomeFaker)
          
        cy.get('.icon-user-unfollow').click()
        cy.get('#reg_email').type(emailfaker)
        cy.get('#reg_password').type('!teste@teste$')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomefaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(2) > .title > .edit').click()
        cy.get('#shipping_first_name').type(nomefaker)
        cy.get('#shipping_last_name').type(sobrenomeFaker)
        cy.get('#shipping_company').type('FAKER 10 LTDA')
        cy.get('#select2-shipping_country-container').click().type('Brasil').get('[aria-selected="true"]').click()
        cy.get('#shipping_address_1').clear().type('Rua das Ruas')
        cy.get('#shipping_address_2').clear().type(100)
        cy.get('#shipping_city').clear().type('São Paulo')
        cy.get('#select2-shipping_state-container').click().type('São Paulo'+ '{enter}')
        cy.get('#shipping_postcode').clear().type('05594-100')               
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').eq(1).click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#billing_company').type('FAKER 10 LTDA')
        cy.get('#billing_address_1').type('Rua das Ruas N100')
        cy.get('#billing_address_2').type('casa')
        cy.get('#billing_city').type('São Paulo')
        cy.get('#billing_postcode').type('05594-100') 
        cy.get('#billing_phone').clear().type('11 94735-5227')
        cy.get('#terms').click()
        cy.get('#place_order').click()
        
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });


})