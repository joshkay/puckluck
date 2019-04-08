/// <reference types="cypress"/>

describe('Page - Landing', () =>
{
  before(() =>
  {
    cy.visit('/');
  });

  it('contains a heading of NHL Fantasy and a background image', () =>
  {
    cy.get('[data-cy=landing-header]').should('have.text', 'NHL Fantasy');
    cy.get('[data-cy=landing-container]')
      .should('contain', 'NHL Fantasy')
      .should('have.css', 'background-image');
  });
  
  it('contains feature listings', () =>
  {
    cy.get('[data-cy=landing-features]').children()
      .should('have.length', 3)
      .should('contain', 'NHL Scores')
      .should('contain', 'Fantasy Manager')
      .should('contain', 'Statistics')
      .each((feature) => {
        cy.wrap(feature).get('svg').should('exist');
        cy.wrap(feature).get('h2').should('exist');
      });
  });
});