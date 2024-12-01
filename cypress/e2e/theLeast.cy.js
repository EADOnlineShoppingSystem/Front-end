describe('Latest Section', () => {
    before(() => {
        // Visit the page where the component is located
        cy.visit('http://localhost:5173/');
    });

    it('should display the "The latest" heading with the correct text', () => {
        // Check if the heading exists and contains the expected text
        cy.get('[data-testid="the-latest"]')
            .scrollIntoView() // Scrolls to the heading if it's not visible
            .should('exist') // Ensure the heading element exists in the DOM
            .and('be.visible') // Ensure the heading is visible
            .and('contain.text', 'The latest. Take a look at') // Verify the main part of the text
            .and('contain.text', "what's new, right now."); // Verify the second part of the text
    });

});
