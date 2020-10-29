/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.login();
  })
  
  it('create department test', () => {
 
    cy.viewport(2560, 1309)
 
    cy.visit('http://localhost:4200/departments')
 
    cy.get('app-header > .header-container > .button-container > .buttonF1 > .mat-icon').click()
 
    cy.get('app-header > .header-container > .button-container > .buttonF3 > .mat-icon').click()
 
    cy.get('#department-name-input').click()
 
    cy.get('#department-name-input').type('Texto de ejemplo')
 
    cy.get('#department-description-input').type('Descripcion de ejemplo')
 
    cy.get('.wrapper > .button-container > #department-button-submit > .mat-button-wrapper > .form-submit').click()
 
  })

  it('create employee', function() {

    cy.viewport(2560, 1309)
 
    cy.visit('http://localhost:4200/employees')
 
    cy.get('.main > app-header > .header-container > .button-container > .buttonF1').click()
 
    cy.get('app-header > .header-container > .button-container > .buttonF2 > .mat-icon').click()
 
    cy.get('#employee-name-input').click()
 
    cy.get('#employee-name-input').type('david poveda')
 
    cy.get('#department-address-input').type('direccion 254')
 
    cy.get('#email-address-input').type('asdfafs@mail.com')


    cy.get('#employee-department-input').click().get('mat-option').contains('Texto de ejemplo').click();
 
    cy.get('.form-detail-view > .button-container > .mat-focus-indicator > .mat-button-wrapper > .form-submit').click()
 
 })

  it('edit department', function() {

    cy.viewport(2560, 1309)
 
    cy.visit('http://localhost:4200/departments')
 
    cy.get('.mat-table > tbody > .mat-row:nth-child(4) > .mat-cell > .mat-icon:nth-child(1)').click()
 
    cy.get('#department-name-input').click()
 
    cy.get('#department-name-input').click()
 
    cy.get('#department-name-input').click()
 
    cy.get('#department-name-input').type('Departamento XX')
 
    cy.get('#department-description-input').type('descripcion editada')
 
    cy.get('.wrapper > .button-container > #department-button-submit > .mat-button-wrapper > .form-submit').click()
 
 })

 it('delete department', function() {

  cy.viewport(2560, 1309)

  cy.visit('http://localhost:4200/departments')

  cy.get('.mat-table > tbody > .mat-row:nth-child(5) > .mat-cell > .mat-icon:nth-child(1)').click()

  cy.get('.wrapper > .button-container > #department-button-delete > .mat-button-wrapper > .form-submit').click()

  cy.get('#mat-dialog-0 > .ng-star-inserted > .dialog-container > div > .dialog-confirm-button:nth-child(1)').click()

})

  it('list filter', function() {

    cy.viewport(2560, 1309)
    
    cy.visit('http://localhost:4200/employees')

    cy.get('#filter-input-name').click()

    cy.get('#filter-input-name').type('david poveda')

    cy.get('#filter-input-name').click()

    cy.get('#filter-input-department').click().get('mat-option').contains('Texto de ejemplo').click();

    cy.get('.mat-form-field-suffix > .mat-datepicker-toggle > .mat-focus-indicator > .mat-button-wrapper > .mat-datepicker-toggle-default-icon').click()

    cy.get('.mat-calendar-table > .mat-calendar-body > .ng-star-inserted:nth-child(3) > .mat-calendar-body-cell:nth-child(2) > .mat-calendar-body-cell-content').click()

    cy.get('table').contains('td', 'david poveda');
   })
})