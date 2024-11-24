describe('New Product Section', () => {
    beforeEach(() => {
      // Visit the page containing the PopularCategories component
      cy.visit('http://localhost:5173/'); // Adjust the URL if needed
    });
  
    it('Should display the "The latest. Take a look at what is new, right now." title', () => {
      // Ensure that the "Categories" title is visible and in the viewport
      cy.get('[data-testid="new-products-title"]')
        .scrollIntoView() // Scroll the element into view if needed
        .should('be.visible'); // Assert that it is visible
    });
  });
  