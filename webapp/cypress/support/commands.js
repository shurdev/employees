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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

Cypress.Commands.add('init', () => {
    cy.visit('http://localhost:4200/login');
  });
  
Cypress.Commands.add("login", () => {
    cy.viewport(2560, 1309)
    
    cy.visit('http://localhost:4200/login')
    
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #login-input').click()
    
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #login-input').click()
    
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #login-input').click()
    
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #login-input').type('admin@test.com')
    
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #password-input').type('12345678')
    
    cy.get('.ng-star-inserted > .mat-card > .mat-card-content > .ng-dirty > #button-login-submit').click()
     
 })
