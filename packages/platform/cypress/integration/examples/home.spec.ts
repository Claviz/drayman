context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033')
  })

  it(`contains welcome message`, () => {
    cy.get('body').should('contain', 'Hello, world!');
  })
})
