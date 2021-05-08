context('counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/counter')
  })

  it(`clicks a button`, () => {
    for (let i = 0; i < 5; i++) {
      cy.get('button').should('contain.text', `Times clicked: ${i}`);
      cy.get('button').click();
    }
  })
})

context('text-input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/text-input');
  })

  it(`inputs text`, () => {
    cy.get('drayman-element > div').should('contain.text', 'Hello');
    cy.get('input').type(', world!');
    cy.get('input').should('contain.value', 'Hello, world!');
    cy.get('drayman-element > div').should('contain.text', 'Hello, world!');
  })
})

context('third-party-element', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/third-party-element');
  })

  it(`renders third-party element`, () => {
    cy.get('button').should('contain.text', 'Hello, world!');
    cy.get('button').should('have.attr', 'mat-raised-button');
  })
})
