context('counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/counter')
  })

  it(`clicks a button`, () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#counter-btn').should('contain.text', `Times clicked: ${i}`);
      cy.get('#counter-btn').click();
    }
  })
})

context('text-input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/text-input');
  })

  it(`inputs text`, () => {
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input').type(', world!');
    cy.get('input').should('contain.value', 'Hello, world!');
    cy.get('p').should('contain.text', 'Hello, world!');
  })
})

context('third-party-element', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/third-party-element');
  })

  it(`renders third-party element`, () => {
    cy.get('drayman-button').find('button').should('contain.text', 'Hello, world!');
    cy.get('drayman-button').find('button').should('have.attr', 'mat-raised-button');
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
      formData.append('file', blob, 'BB.png');

      cy.get('drayman-file-uploader').find('input[type="file"]').attachFile({
        fileContent: blob,
        fileName: 'BB.png',
        mimeType: 'image/png'
      });

      const fileInfo = JSON.stringify({
        fieldname: 'file',
        originalname: 'BB.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 185556
      }, null, 2);

      cy.get('pre').should((x) =>
        expect(x.text().trim()).to.equal(fileInfo)
      )

      cy.readFile('image.png');
      cy.get('drayman-file-uploader').find('.filepond--action-revert-item-processing').click();
      cy.readFile('image.png').should('not.exist');
    })
  })
})

context('third-party-upload', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/file-upload');
  })

  it(`uploads a file`, () => {
    cy.fixture('BB.png').then((image) => {
      const blob = Cypress.Blob.base64StringToBlob(image, 'image/png');
      const formData = new FormData();
      formData.append('file', blob, 'BB.png');

      cy.get('input[type="file"]').attachFile({
        fileContent: blob,
        fileName: 'BB.png',
        mimeType: 'image/png'
      });

      const fileInfo = JSON.stringify({
        fieldname: 'file',
        originalname: 'BB.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: 185556
      }, null, 2);

      cy.get('pre').should((x) =>
        expect(x.text().trim()).to.equal(fileInfo)
      )
    })
  })
})

context('communication using EventHub', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/communication-ping')
  })

  it(`two componnents communicate`, () => {
    cy.get('#ping-btn').click();
    cy.get('p').should('contain.text', 'Pong!');
  })
})

context('modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/modal')
  })

  it(`opens & closes modal using Browser hooks`, () => {
    cy.get('p').should('contain.text', 'Modal is opened: no');
    cy.get('button').contains('Open modal').click();
    cy.get('p').should('contain.text', 'Modal is opened: yes');
    cy.get('button').contains('Close modal').click();
    cy.get('p').should('contain.text', 'Modal is opened: no');
  })
})

context('DOM element reference', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/focus')
  })

  it(`focuses element`, () => {
    cy.get('input').should('not.have.focus');
    cy.get('#focus-btn').click();
    cy.get('input').should('have.focus');
  })
})

context('file reference', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/dependency')
  })

  it(`executes function from referenced file`, () => {
    cy.get('h3').should('have.text', '2+2=4');
  })
})