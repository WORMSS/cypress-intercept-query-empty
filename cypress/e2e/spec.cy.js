/// <reference types="cypress" />
describe('page', () => {
  it('should have query param', () => {
    cy.visit('index.html');
    cy.intercept('/api/example*').as('catchme');
    cy.get('#button').click();
    cy.wait('@catchme').its('request.query.QueryName').should('equal', 'Goat');
  });

  it('uses a dirty hack', () => {
    cy.visit('index.html');
    cy.intercept('/api/example*').as('catchme');
    cy.get('#button').click();
    cy.wait('@catchme')
      .then((intercept) => {
        const url = new URL(intercept.request.url);
        intercept.request.query = Object.fromEntries(url.searchParams.entries());
        return intercept;
      })
      .its('request.query.QueryName').should('equal', 'Goat');
  });
})
