/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'

const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
    });
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.fixture('perfil').then((dados) => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha)
            cy.get('.woocommerce-form > .button').click()

            cy.get('.page-title').should('contain', 'Minha conta')
            EnderecoPage.editarEnderecoFaturamento(
                dadosEndereco[1].nome,
                dadosEndereco[1].sobrenome,
                dadosEndereco[1].empresa,
                dadosEndereco[1].pais,
                dadosEndereco[1].endereco,
                dadosEndereco[1].numero,
                dadosEndereco[1].cidade,
                dadosEndereco[1].estado,
                dadosEndereco[1].cep,
                dadosEndereco[1].celular,
                dadosEndereco[1].email)
            cy.get('#primary-menu > .menu-item-629 > a').click()

            cy.addProdutos('Abominable Hoodie', 'M', 'Red', 5)
            
            cy.get('.woocommerce-message > .button').click()
            cy.get('.checkout-button').click()
            cy.get('#terms').click().type('{enter}')
            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        })
    })
})