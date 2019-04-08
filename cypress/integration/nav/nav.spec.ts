/// <reference types="cypress"/>

describe('Nav', () =>
{
  beforeEach(() =>
  {
    cy.visit('/');
  });

  describe('iPhone 6+ resolution', () =>
  {
    beforeEach(() =>
    {
      cy.viewport('iphone-6+');
    });

    it('should be hidden by default with a visibile hamburger icon', () =>
    {
      cy.get('[data-cy=nav-desktop]').should('not.be.visible');
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
      cy.get('[data-cy=nav-open]').should('be.visible');
    });

    it('should open when the icon is clicked', () =>
    {
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
      cy.get('[data-cy=nav-open]').click();
      cy.get('[data-cy=nav-mobile]').should('be.visible');
    });

    it('should close when clicked outside of nav', () =>
    {
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
      cy.get('[data-cy=nav-open]').click();
      cy.get('[data-cy=nav-mobile]').should('be.visible');
      cy.get('[data-cy=nav-mobile]').click('right');
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
    });

    it('should close when a navigation link is clicked', () =>
    {
      cy.get('[data-cy=nav-open]').click();
      cy.get('[data-cy=nav-mobile]').find('a').each((link, index) =>
      {
        cy.get('[data-cy=nav-mobile]').should('be.visible');
        cy.get('[data-cy=nav-mobile]').find('a').eq(index).click();
        cy.get('[data-cy=nav-mobile]').should('not.be.visible');

        if (index < link.length)
        {
          cy.get('[data-cy=nav-open]').click();
        }
      });
    });

    it('should close when the screen resizes to 720p', () =>
    {
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
      cy.get('[data-cy=nav-open]').click();
      cy.viewport(1280, 720);
      cy.get('[data-cy=nav-mobile]').should('not.be.visible');
    });
  });
});