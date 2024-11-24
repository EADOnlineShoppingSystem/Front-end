describe('Shopping Event Section', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/'); // Replace with the correct URL of your application
    });
  
    it('Should hover over the Shop Now button', () => {
      // Ensure the card is scrolled into view
      cy.get('.bg-gradient-to-b.from-black\\/50.via-black\\/30.to-transparent')
        .scrollIntoView()
        .should('be.visible')
        .within(() => {
          // Hover over the Shop Now button
          cy.get('[data-testid="shop-now-button"]')
            .should('be.visible') // Ensure the button is visible
            .trigger('mouseover') // Simulate the hover effect
  
          // Check if the button has the hover effect (scale and shadow should appear)
          cy.get('[data-testid="shop-now-button"]')
            .should('have.class', 'hover:scale-105') // Check for scale hover effect class
            .and('have.class', 'hover:shadow-lg'); // Check for shadow hover effect class
        });
    });
  });
  