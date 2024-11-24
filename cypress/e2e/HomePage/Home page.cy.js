describe('Verify Page Loads Successfully', () => {
    it('Should load the page without errors', () => {
      // Step 1: Visit the URL
      cy.visit('http://localhost:5173/');
  
      // Step 2: Verify the page title
      cy.title().should('not.be.empty');
  
      // Step 3: Check for a specific element (optional, depends on your app)
      // Replace '.header' with a selector relevant to your app
      cy.get('body').should('be.visible'); // Verify the body is visible
    });
  });
  