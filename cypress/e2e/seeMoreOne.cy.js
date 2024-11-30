// describe('Button Display Test', () => {
//     before(() => {
//       // Visit the page where the button is located
//       cy.visit('http://localhost:5173/');
//     });
  
//     it('should display the button with correct styling and content', () => {
//       // Select the button element and check its properties
//       cy.get('[data-testid="see-more-button-one"]')
//         .should('exist') // Ensure the button exists in the DOM
//         .and('be.visible') // Ensure the button is visible on the page
//         .and('have.class', 'group') // Check for the 'group' class
//         .and('have.class', 'relative') // Check for the 'relative' class
//         .and('have.class', 'p-[2px]') // Check for the padding class
//         .and('have.class', 'overflow-hidden') // Check for overflow class
//         .and('have.class', 'rounded-full') // Check for border radius class
//         .and('have.class', 'animate-[float_3s_ease-in-out_infinite]') // Check for animation class
//         .and('have.class', 'w-auto'); // Check for width class
  
//       // Check for the rotating gradient border (inner div)
//       cy.get('[data-testid="see-more-button-one"] > [data-testid="rotating-gradient-border"]').first()
//         .should('exist') // Ensure the gradient div exists
//         .and('have.class', 'absolute') // Check for the 'absolute' class
//         .and('have.class', 'inset-0') // Check for positioning class
//         .and('have.class', 'bg-gradient-to-r') // Check for gradient class
//         .and('have.class', 'from-purple-600') // Check starting color
//         .and('have.class', 'via-pink-600') // Check middle color
//         .and('have.class', 'to-blue-600') // Check end color
//         .and('have.class', 'animate-[spin_3s_linear_infinite]'); // Check for animation class
  
//       // Check the button content (inner div)
//       cy.get('[data-testid="see-more-button-one"] > [data-testid="see-more-button-conten"]').last()
//         .should('exist') // Ensure the content div exists
//         .and('be.visible') // Ensure it's visible
//         .and('have.class', 'relative') // Check for relative positioning
//         .and('have.class', 'flex') // Check for flex container class
//         .and('have.class', 'items-center') // Check for alignment class
//         .and('have.class', 'gap-2') // Check for gap class
//         .and('have.class', 'px-4') // Check padding for small screens
//         .and('have.class', 'sm:px-6') // Check padding for larger screens
//         .and('have.class', 'py-2') // Check vertical padding
//         .and('have.class', 'sm:py-2.5') // Check vertical padding for larger screens
//         .and('have.class', 'rounded-full') // Check for rounded corners
//         .and('have.class', 'bg-black/80') // Check background color
//         .and('have.class', 'hover:bg-black/60') // Check hover background
//         .and('have.class', 'backdrop-blur-sm') // Check backdrop blur
//         .and('have.class', 'text-white') // Check text color
//         .and('have.class', 'text-base') // Check text size
//         .and('have.class', 'sm:text-lg') // Check larger text size for larger screens
//         .and('have.class', 'transition-all') // Check transition class
//         .and('have.class', 'duration-300') // Check transition duration
//         .and('have.class', 'group-hover:bg-black/40'); // Check hover background for the group
  
//       // Verify that the text "See More" exists inside the button
//       cy.get('[data-testid="see-more-button-one"] > div').last()
//         .contains('span', 'See More');
  
//       // Verify the FontAwesome icon is present with expected properties
//       cy.get('[data-testid="see-more-button-one"] > div').last().find('svg')
//         .should('exist') // Check the icon exists
//         .and('have.class', 'w-3') // Check icon width
//         .and('have.class', 'h-3') // Check icon height
//         .and('have.class', 'sm:w-4') // Check icon width on larger screens
//         .and('have.class', 'sm:h-4') // Check icon height on larger screens
//         .and('have.class', 'transform') // Check transform class
//         .and('have.class', 'group-hover:translate-y-1'); // Check hover effect for translation
//     });
//   });
  