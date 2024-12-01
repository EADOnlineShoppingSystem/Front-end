describe('Categories', () => {
    before(() => {
        // Visit the page where the PopularCategories component is located
        cy.visit('http://localhost:5173/');
    });

    it('should display a loading message initially', () => {
        // Check if the loading message is shown while data is being fetched
        cy.get('.w-full.text-center.py-8')
            .should('exist')
            .and('contain.text', 'Loading categories...');
    });

    it('should display categories when data is fetched successfully', () => {
        // Mock the API response
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 200,
            body: {
                categories: [
                    { _id: '1', name: 'Category 1', image: { url: 'https://example.com/image1.jpg' } },
                    { _id: '2', name: 'Category 2', image: { url: 'https://example.com/image2.jpg' } }
                ]
            }
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Check if the categories are displayed
        cy.get('.swiper-slide').should('have.length', 2);
        cy.get('.swiper-slide').first().should('contain.text', 'Category 1');
        cy.get('.swiper-slide').last().should('contain.text', 'Category 2');
    });

    it('should display "No categories found" when there are no categories', () => {
        // Mock the API response for no categories
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 200,
            body: { categories: [] }
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Check if the "No categories found" message is displayed
        cy.get('[data-testid="no-categories-found"]')
            .should('exist')
            .and('contain.text', 'No categories found');
    });

    it('should display an error message if fetching categories fails', () => {
        // Mock the API to simulate an error response
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 500,
            body: { error: 'Failed to load categories' }
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Check if the error message is displayed
        cy.get('.w-full.text-center.py-8.text-red-500')
            .should('exist')
            .and('contain.text', 'Failed to load categories');
    });

    it('should render category items with proper alt text and links', () => {
        // Mock API response with sample categories
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 200,
            body: {
                categories: [
                    { _id: '1', name: 'Category 1', image: { url: 'https://example.com/image1.jpg' } },
                    { _id: '2', name: 'Category 2', image: { url: 'https://example.com/image2.jpg' } }
                ]
            }
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Verify the images have the correct alt text
        cy.get('.swiper-slide img').first().should('have.attr', 'alt', 'Category 1');
        cy.get('.swiper-slide img').last().should('have.attr', 'alt', 'Category 2');

        // Verify the links have the correct href attributes
        cy.get('.swiper-slide a').first().should('have.attr', 'href', '/categories/Category 1');
        cy.get('.swiper-slide a').last().should('have.attr', 'href', '/categories/Category 2');
    });

    it('should display the correct number of slides based on breakpoints', () => {
        // Mock API response with sample categories
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 200,
            body: {
                categories: [
                    { _id: '1', name: 'Category 1', image: { url: 'https://example.com/image1.jpg' } },
                    { _id: '2', name: 'Category 2', image: { url: 'https://example.com/image2.jpg' } },
                    { _id: '3', name: 'Category 3', image: { url: 'https://example.com/image3.jpg' } },
                    { _id: '4', name: 'Category 4', image: { url: 'https://example.com/image4.jpg' } },
                    { _id: '5', name: 'Category 5', image: { url: 'https://example.com/image5.jpg' } }
                ]
            }
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Test different breakpoints
        cy.viewport(320, 480); // Small screen
        cy.get('.swiper-slide').should('have.length', 2);

        cy.viewport(768, 1024); // Medium screen
        cy.get('.swiper-slide').should('have.length', 4);

        cy.viewport(1280, 1600); // Large screen
        cy.get('.swiper-slide').should('have.length', 6);
    });

    it('should handle network errors gracefully', () => {
        // Mock network error for the API call
        cy.intercept('GET', '/Product/api/products/categories', {
            statusCode: 0,
            body: {}
        }).as('getCategories');

        // Visit the page and wait for the network response
        cy.visit('http://localhost:5173/');
        cy.wait('@getCategories');

        // Check if the error handling works and displays an error message
        cy.get('.w-full.text-center.py-8.text-red-500')
            .should('exist')
            .and('contain.text', 'Failed to load categories');
    });
});
