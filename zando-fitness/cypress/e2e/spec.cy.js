describe('Test Connection', () => {
    it('Should be able to visit localhost:3000', () => {
        cy.visit('http://localhost:3000/');
    })
})