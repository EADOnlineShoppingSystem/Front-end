describe('Popular Categories Section', () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
      cy.visit('http://localhost:5173/');
    });
  
    const categories = [
      { image: "/popular/1.png", title: "iPhone", href: "/category/accessories", numOfProducts: 100 },
      { image: "/popular/3.png", title: "iPad", href: "/category/smartphones", numOfProducts: 100 },
      { image: "/popular/2.png", title: "Mac", href: "/category/laptops", numOfProducts: 100 },
      { image: "/popular/4.png", title: "Apple Watch", href: "/category/smartphones", numOfProducts: 100 },
      { image: "/popular/5.png", title: "Apple Vision Pro", href: "/category/laptops", numOfProducts: 100 },
      { image: "/popular/6.png", title: "AirPods", href: "/category/smartphones", numOfProducts: 100 },
      { image: "/popular/7.png", title: "AirTag", href: "/category/laptops", numOfProducts: 100 },
      { image: "/popular/8.png", title: "Apple TV 4K", href: "/category/laptops", numOfProducts: 100 },
      { image: "/popular/9.png", title: "HomePod", href: "/category/laptops", numOfProducts: 100 },
      { image: "/popular/10.png", title: "Accessories", href: "/category/laptops", numOfProducts: 100 }
    ];
  
    it('Should display all categories with title, image, and link', () => {
      categories.forEach((category) => {
        // Check if category title exists
        cy.contains(category.title)
          .should('exist');
  
        // Check if link exists and has correct href
        cy.get(`a[href="${category.href}"]`)
          .should('exist')
          .and('have.attr', 'href', category.href);
  
        // Check if image exists and has correct src
        cy.get(`img[src="${category.image}"]`)
          .should('exist')
          .and('have.attr', 'src', category.image);
      });
    });
  
    it('Should have clickable links', () => {
      categories.forEach((category) => {
        cy.get(`a[href="${category.href}"]`)
          .should('exist')
          .and('have.attr', 'href', category.href)
          .then($link => {
            expect($link.width()).to.be.greaterThan(0);
            expect($link.height()).to.be.greaterThan(0);
          });
      });
    });
  
    it('Should display images properly', () => {
      categories.forEach((category) => {
        cy.get(`img[src="${category.image}"]`)
          .should('exist')
          .and((img) => {
            expect(img[0].complete).to.be.true;
            expect(img[0].naturalWidth).to.be.greaterThan(0);
          });
      });
    });
  
    it('Should adjust layout for different screen sizes', () => {
      const checkCategoriesVisibility = () => {
        categories.forEach((category) => {
          cy.get(`img[src="${category.image}"]`)
            .should('exist');
          cy.contains(category.title)
            .should('exist');
        });
      };
  
      // Mobile view
      cy.viewport('iphone-x');
      checkCategoriesVisibility();
      
      // Tablet view
      cy.viewport('ipad-2');
      checkCategoriesVisibility();
      
      // Desktop view
      cy.viewport(1024, 768);
      checkCategoriesVisibility();
    });
  
    it('Should have proper accessibility attributes', () => {
        // Check images have alt text, but allow empty alt for decorative images
        cy.get('img').each($img => {
          cy.wrap($img)
            .should('have.attr', 'alt')
            .then((alt) => {
              // Allow empty alt for decorative images
              if (alt.trim() !== '') {
                expect(alt).to.not.be.empty;
              }
            });
        });
      
        // Check links are accessible
        cy.get('a').each($link => {
          cy.wrap($link)
            .should('have.attr', 'href')
            .and('not.be.empty');
        });
      });
      
  });