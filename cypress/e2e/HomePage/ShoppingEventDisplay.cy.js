describe('Shopping Event Section', () => {
    beforeEach(() => {
      // Visit the page containing the ShoppingEvent component
      cy.visit('http://localhost:5173/'); // Replace with the correct URL of your application
    });
  
    it('Should display the Apple Shopping Event card', () => {
      // Ensure the card is scrolled into view
      cy.get('.bg-gradient-to-b.from-black\\/50.via-black\\/30.to-transparent')
        .scrollIntoView() // Scroll into view
        .should('be.visible') // Ensure the container is visible
        .within(() => {
          // Check for the heading
          cy.get('[data-testid="shopping-event-title"]')
            .should('be.visible') // Ensure the heading is visible
            .and('have.text', 'Apple Shopping Event'); // Ensure the heading text matches
  
          // Check for the paragraph
          cy.get('[data-testid="shopping-event-description"]')
            .should('be.visible') // Ensure the paragraph is visible
            .and(
              'have.text',
              'Shop great deals on MacBook, iPad, iPhone and more.'
            ); // Ensure the paragraph text matches
  
          // Check for the button
          cy.get('[data-testid="shop-now-button"]')
            .should('be.visible') // Ensure the button is visible
            .and('have.text', 'Shop Now') // Ensure the button text matches
            .and('have.class', 'hover:scale-105'); // Ensure the button has the hover effect class
        });
    });
  });
  