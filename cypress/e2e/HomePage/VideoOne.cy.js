describe('Video Play and Pause Functionality', () => {
    // Catch uncaught exceptions to avoid failing the test on the AbortError
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('The play() request was interrupted by a call to pause()')) {
        return false; // Ignore AbortError
      }
      return true; // Let other exceptions fail the test
    });
  
    beforeEach(() => {
      // Visit the page containing the VideoFrame component
      cy.visit('http://localhost:5173/');
    });
  
    it('Should play the video on load', () => {
      // Get the video element and check if it is not paused
      cy.get('[data-testid="apple-video-one"]').then(($video) => {
        expect($video[0].paused).to.be.false; // Video should be playing on load
      });
    });
  
    it('Should pause and play the video when the button is clicked', () => {
      // Pause the video by clicking the play/pause button
      cy.get('[data-testid="play-pause-button"]').click();
      cy.wait(500); // Wait for the state to settle
  
      // Verify the video is paused
      cy.get('[data-testid="apple-video-one"]').then(($video) => {
        expect($video[0].paused).to.be.true; // Video should be paused
      });
  
      // Play the video again by clicking the play/pause button
      cy.get('[data-testid="play-pause-button"]').click();
      cy.wait(500); // Wait for the state to settle
  
      // Verify the video is playing
      cy.get('[data-testid="apple-video-one"]').then(($video) => {
        expect($video[0].paused).to.be.false; // Video should be playing
      });
    });
  });
  