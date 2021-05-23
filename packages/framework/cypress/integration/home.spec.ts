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

context('third-party-upload', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/third-party-upload');
  })

  it(`uploads a file`, () => {
    cy.fixture('BB.png').then((image) => {
      const blob = Cypress.Blob.base64StringToBlob(image, 'image/png');
      const formData = new FormData();
      formData.append('filepond', blob, 'BB.png');

      cy.get('input[type="file"]').attachFile({
        fileContent: blob,
        fileName: 'BB.png',
        mimeType: 'image/png'
      });

      const fileInfo = JSON.stringify({
        fieldname: 'filepond',
        originalname: 'BB.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 185556
      }, null, 2);

      cy.get('pre').should((x) =>
        expect(x.text().trim()).to.equal(fileInfo)
      )

      cy.readFile('image.png');
      cy.get('.filepond--action-revert-item-processing').click();
      cy.readFile('image.png').should('not.exist');
    })
  })
})