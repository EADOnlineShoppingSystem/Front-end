describe('Categories', () => {
    before(() => {
        // Visit the page where the header is located
        cy.visit('http://localhost:5173/');
      });
    it('should load the categories text successfully', () => {
    // Check if the heading exists and has the expected text
    cy.get('[data-testid="popular-categories-heading"]')
    .scrollIntoView()
      .should('exist') // Ensure the heading exists in the DOM
      .and('be.visible') // Ensure it is visible
      .and('contain.text', 'Categories'); // Verify the text content

});
});