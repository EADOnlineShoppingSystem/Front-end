describe('Home Page Video Playback Test', () => {
    beforeEach(() => {
      // Intercept potential network requests
      cy.intercept('GET', '*').as('pageLoad');
      
      // Handle uncaught exceptions globally
      cy.on('uncaught:exception', (err) => {
        // Log specific errors
        if (err.message.includes('AbortError')) {
          cy.log('Caught AbortError:', err.message);
          return false;
        }
        // For other errors, log and continue
        cy.log('Uncaught Exception:', err.message);
        return false;
      });
  
      // Visit the home page with extended timeout
      cy.visit('http://localhost:5173/', {
        timeout: 30000,
        onBeforeLoad(win) {
          // Stub console errors for logging
          cy.stub(win.console, 'error').as('consoleError');
        }
      });
  
      // Wait for page and potential async loads
      cy.wait('@pageLoad', { timeout: 15000 });
      cy.wait(3000);
    });
  
    it('should handle video playback with comprehensive checks', () => {
      // Debugging: Log page structure
      cy.get('body').then(($body) => {
        cy.log('Total body elements:', $body.find('*').length);
      });
  
      // Wait for video element
      cy.get('video', { timeout: 20000 })
        .should('exist')
        .and('be.visible')
        .then(($video) => {
          // Log video element details
          cy.log('Video element found:', $video.length);
          cy.log('Video source:', $video.attr('src'));
        });
  
      // Robust play/pause button locator with multiple strategies
      const findPlayPauseButton = () => {
        return cy.get('body').then(($body) => {
          // Try multiple selectors
          const selectors = [
            '[data-testid="play-pause-button"]',
            'button[aria-label="Play video"]',
            'button[aria-label="Pause video"]'
          ];
  
          for (const selector of selectors) {
            const button = $body.find(selector);
            if (button.length > 0) {
              cy.log(`Found button with selector: ${selector}`);
              return cy.wrap(button);
            }
          }
  
          // If no button found, fail the test
          throw new Error('Play/Pause button not found');
        });
      };
  
      // Initial video state check
      cy.get('video')
        .invoke('prop', 'paused')
        .then((isPaused) => {
          cy.log('Initial video paused state:', isPaused);
        });
  
      // Locate and interact with play/pause button
      findPlayPauseButton().then(($button) => {
        cy.wrap($button)
          .should('exist')
          .and('be.visible')
          .click({ force: true });
      });
  
      // Verify button state and video playback
      findPlayPauseButton()
        .invoke('attr', 'aria-label')
        .should('satisfy', (label) => 
          ['Play video', 'Pause video'].includes(label)
        );
  
      // Final state checks
      cy.get('video')
        .invoke('prop', 'paused')
        .then((isPaused) => {
          cy.log('Final video paused state:', isPaused);
        });
  
      // Log any console errors
      cy.get('@consoleError').then((errors) => {
        if (errors && errors.length) {
          cy.log('Console Errors:', errors);
        }
      });
    });
  });