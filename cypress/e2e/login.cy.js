/// <reference types="cypress" />
let dadosLogin
const perfil= require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('felipe_teste@ebac.com' , 'felipe.teste')
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.get('#username').type('felipe_teste@ebac.com')
        cy.get('#password').type('felipe.teste')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain' , 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, felipe_teste')
    })
})