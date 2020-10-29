
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

 Cypress.Commands.add(
  'selectNth',
  { prevSubject: 'element' },
  (subject, pos) => {
    cy.wrap(subject)
      .children('option')
      .eq(pos)
      .then(e => {
        cy.wrap(subject).select(e.val())
      })
  })