describe('Header Display Test', () => {
    before(() => {
      // Visit the page where the header is located
      cy.visit('http://localhost:5173/');
    });
  
    it('should display the header with correct text, styling, and animation', () => {
      // Select the <h1> element and check its properties
      cy.get('[data-testid="explore-latest-lineup"]')
        .should('exist') // Ensure the <h1> exists in the DOM
        .and('be.visible') // Ensure the <h1> is visible on the page
        .and('have.text', 'Explore Latest Lineup') // Check the text content
        .and('have.class', 'text-3xl') // Check for responsive text class
        .and('have.class', 'sm:text-4xl')
        .and('have.class', 'md:text-5xl')
        .and('have.class', 'lg:text-6xl')
        .and('have.class', 'text-white') // Check for color class
        .and('have.class', 'font-medium') // Check for font class
        .and('have.class', 'mb-6') // Check for margin class for small screens
        .and('have.class', 'md:mb-8') // Check for margin class for medium screens
        .and('have.class', 'opacity-0') // Verify the initial opacity is 0
        .and('have.class', 'animate-[fadeIn_1s_ease-out_forwards]') // Check for animation class
        .and('have.class', 'max-w-4xl') // Check for max width class
        .and('have.class', 'mx-auto'); // Check for centering class
  
      // Optionally, check the animation effect after the page loads
      cy.get('h1').should('have.css', 'opacity', '1'); // Ensure the opacity transitions to 1 after animation
    });
  });
  