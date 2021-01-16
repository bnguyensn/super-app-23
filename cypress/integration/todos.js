context('Todo list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('is present and has a Todo', () => {
    cy.get('li').should('have.length', 4);
  });
});
