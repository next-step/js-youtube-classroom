// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands';

Cypress.Commands.add('searchVideo', (keyword) => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type(keyword);
    cy.get('#video-search-submit').click();
});

Cypress.Commands.add('addKeywordSearch', (keyword) => {
    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type(keyword);
    cy.get('#video-search-submit').click();
});
