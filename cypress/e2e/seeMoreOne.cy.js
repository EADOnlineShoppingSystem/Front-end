describe('Button Display Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '*').as('pageLoad');
    cy.on('uncaught:exception', () => false);
    cy.visit('http://localhost:5173/', { timeout: 30000 });
    cy.wait('@pageLoad', { timeout: 15000 });
    cy.wait(3000); // For dynamic rendering, if necessary
  });

  it('should display the button and content correctly', () => {
    // Helper to find button
    const findSeeMoreButton = () => cy.get('[data-testid="see-more-button-one"]');

    // Verify button exists and is visible
    findSeeMoreButton().should('exist').and('be.visible');

    // Check rotating gradient border
    cy.get('[data-testid="rotating-gradient-border"]')
      .should('exist')
      .and('be.visible');

    // Check button content
    cy.get('[data-testid="see-more-button-content"]')
      .should('exist')
      .and('be.visible');

    cy.get('[data-testid="see-more-button-text"]', { timeout: 10000 })
      .should('exist')
      .and('be.visible')

    // Verify icon
    cy.get('svg')
      .should('exist')
      .and('have.class', 'w-3');
  });
});
