describe('New Products Section', () => {
    beforeEach(() => {
      // Visit the page containing the NewProducts component
      cy.visit('http://localhost:5173/'); // Replace with the correct URL of your application
    });
  
    it('Should display at least one product card', () => {
      // Ensure the Swiper container is initialized and visible
      cy.get('.swiper')
        .first() // Target the first Swiper container if multiple exist
        .should('have.class', 'swiper-initialized') // Swiper should be initialized
        .scrollIntoView() // Scroll into view for visibility check
        .should('be.visible'); // Assert visibility of the Swiper container
  
      // Check that at least one card (SwiperSlide) is rendered and visible
      cy.get('.swiper-slide')
        .should('have.length.at.least', 1) // Ensure at least one card exists
        .first() // Focus on the first card for specific checks
        .scrollIntoView() // Scroll to the specific card
        .should('be.visible'); // Assert that the card is visible
    });
  });
  