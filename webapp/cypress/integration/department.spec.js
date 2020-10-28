/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.login();
  })


  it('crete employee test', () => {
 
    cy.visit('http://localhost:4200/employees')
 
    cy.get('app-header > .header-container > .button-container > .buttonF1 > .mat-icon').click()
 
    cy.get('app-header > .header-container > .button-container > .buttonF2 > .mat-icon').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-3').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-3').type('asfasf')
 
    cy.get('.ng-star-inserted > .detail-view-wrapper > .form-detail-view > .mat-form-field:nth-child(2) > .mat-form-field-wrapper').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-4').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-4').type('asffas')
 
    cy.get('.form-detail-view > .mat-form-field:nth-child(3) > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-5').type('afsfafas@afasf.com')
 
    cy.get('.mat-form-field-infix > #mat-select-2 > .mat-select-trigger > #mat-select-value-3 > .mat-select-placeholder').click()
 
    cy.get('#cdk-overlay-1 > .mat-select-panel-wrap > #mat-select-2-panel > #mat-option-4 > .mat-option-text').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-4').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-4').click()
 
    cy.get('.mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #mat-input-4').type('asffasasfasf@sffas.com')
 
    cy.get('.ng-star-inserted > .detail-view-wrapper > .form-detail-view > .button-container > .mat-focus-indicator:nth-child(1)').click()
 
 
  })
})