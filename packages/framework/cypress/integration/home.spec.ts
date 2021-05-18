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

context('modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/modal');
  })

  it(`correctly opens and detects component inside modal`, () => {
    cy.get('h3').should('contain.text', 'I am not modal!');
    cy.get('button').click();
    cy.get('app-drayman-modal').should('contain.text', 'I am modal!');
  })
})

context('update-from-html', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/update-from-html');
  })

  it(`correctly updates options of component from browser HTML`, () => {
    cy.contains('Ready!');
    cy.contains('Updated!');
  })
})

context('css-class', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/css-class');
  })

  it(`correctly applies CSS class`, () => {
    cy.get('.red-box').should('have.css', 'background-color', 'rgb(255, 0, 0)');
    cy.get('.red-box').should('have.css', 'width', '100px');
    cy.get('.red-box').should('have.css', 'height', '100px');
  })
})

