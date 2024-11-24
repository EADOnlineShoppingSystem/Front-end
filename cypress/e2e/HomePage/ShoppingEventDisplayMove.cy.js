describe('Shopping Event Card Image Movement', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/'); // Replace with the correct URL of your application
    });
  
    it('Should move the image when hovered over', () => {
      // Ensure the first Swiper slide is visible by scrolling it into view
      cy.get('.swiper .swiper-slide').first() // Get the first Swiper slide
        .scrollIntoView() // Scroll to the first slide if necessary
        .should('be.visible'); // Ensure the slide is visible
  
      // Find the first image inside the first swiper slide
      cy.get('.swiper .swiper-slide img').first() // Target only the first image
        .should('be.visible') // Ensure the image is visible
        .trigger('mouseover'); // Simulate hover action to cause image movement
  
      // Verify that the image has been transformed (moved or scaled)
      cy.get('.swiper .swiper-slide img').first() // Target the first image again
        .should('have.css', 'transform')
        .and('not.eq', 'none'); // Ensure the transform property is applied, meaning movement occurred
    });
  });
  