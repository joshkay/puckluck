describe('Page - NHL scores', () =>
{
  before(() =>
  {
    cy.visit('/nhl/scores');
  });

  it('should show a score header with proper dates', () =>
  {
    cy.get('h2').should('contain', 'Scores');

    cy.get('[data-cy=date-selection]').children().should('have.length', 5);
    cy.get('[data-cy=date-selection]').children().first().should('have.text', 
      Cypress.moment().subtract(2, 'days').format('MMMM D')
    );
    cy.get('[data-cy=date-selection] > :nth-child(3)').children().should('have.text', 
      Cypress.moment().format('MMMM D')
    );
    cy.get('[data-cy=date-selection]').children().last().should('have.text', 
      Cypress.moment().add(2, 'days').format('MMMM D')
    );
    
    cy.get('[data-cy=nhl-scores-date]').should('have.text', Cypress.moment().format('MMMM Do, YYYY'));

    //cy.get('[data-cy=nhl-score-listing]').should('')
  });

  it('should change the date when the calendar is used', () =>
  {
    cy.get('#picker-popover').should('not.be.visible');
    cy.get('[data-cy=calendar-date-picker]').click();
    
    cy.get('#picker-popover').should('be.visible');

    const day = 20;

    cy.get('#picker-popover').children().last().children().last().contains(day).click();

    let cypressDay = Cypress.moment().startOf('month').add(day - 1, 'days');

    cy.get('[data-cy=date-selection]').children().first().should('have.text', 
      cypressDay.clone().subtract(2, 'days').format('MMMM D')
    );
    cy.get('[data-cy=date-selection] > :nth-child(3)').children().should('have.text', 
      cypressDay.format('MMMM D')
    );
    cy.get('[data-cy=date-selection]').children().last().should('have.text', 
      cypressDay.clone().add(2, 'days').format('MMMM D')
    );

    cy.get('[data-cy=date-selection] > :nth-child(3)').children().should('have.text', 
      cypressDay.format('MMMM D')
    );
    cy.get('[data-cy=nhl-scores-date]').should('have.text',
      cypressDay.format('MMMM Do, YYYY')
    );
  });
});