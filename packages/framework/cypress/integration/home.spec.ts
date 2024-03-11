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

context('file upload (third-party)', () => {
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

context('file upload', () => {
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
      }).trigger('change');

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

context('lifecycle events', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/lifecycle-init')
  })

  it(`handles onInit`, () => {
    cy.get('h3').should('have.text', 'Waiting for init hook....');
    cy.get('h3').should('have.text', 'Initialized!');
  })
})

context('server storage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/server-counter')
  })

  it(`saves data even after page refresh`, () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#counter-btn').should('contain.text', `Times clicked: ${i}`);
      cy.get('#counter-btn').click();
    }
    cy.reload();
    cy.get('#counter-btn').should('contain.text', `Times clicked: 5`);
  })
})

context('shows errors', () => {
  it(`if it happend on init`, () => {
    cy.visit('http://localhost:3033/error-init');
    cy.document().should('contain.text', 'Child component "error-init" failed to initialize!');
    cy.document().should('contain.text', 'error-init');
    cy.document().should('not.contain.text', 'Hello, world!');
  })

  it(`if it happend on render`, () => {
    cy.visit('http://localhost:3033/error-render');
    cy.document().should('contain.text', 'Child component "error-render" failed to render!');
    cy.document().should('contain.text', 'error-render');
    cy.document().should('not.contain.text', 'Hello, world!');
  })
})

context('default props', () => {
  it(`shows default prop if prop is not set`, () => {
    cy.visit('http://localhost:3033/default-props');
    cy.document().should('contain.text', 'Default text');
    cy.document().should('contain.text', 'Before render: Default text');
  })

  it(`shows passed prop instead of default one if prop is set`, () => {
    cy.visit('http://localhost:3033/default-props-2');
    cy.document().should('contain.text', 'Not default text');
    cy.document().should('contain.text', 'Before render: Not default text');
  })
})

context('root events', () => {
  it(`handles event set from client HTML`, () => {
    cy.visit('http://localhost:3033/root-events');
    cy.document().should('not.contain.text', 'Nice!');
    cy.contains('Click!').click();
    cy.document().should('contain.text', 'Nice!');
  })
})

context('event guards', () => {
  it(`handles keyboard shortcut`, () => {
    cy.visit('http://localhost:3033/event-guards-text-input');
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{ctrl}s', { release: false });
    cy.get('p').should('contain.text', 'Saved!');
  })

  it(`doesn't handle other keyboard shortcut`, () => {
    cy.visit('http://localhost:3033/event-guards-text-input');
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{ctrl}a', { release: false });
    cy.get('p').should('contain.text', 'Helloa');
  })

  it(`handles keyboard shortcut in third-party element`, () => {
    cy.visit('http://localhost:3033/event-guards-third-party-element');
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{ctrl}s', { release: false });
    cy.get('p').should('contain.text', 'Saved!');
  })

  it(`doesn't handle other keyboard shortcut in third-party element`, () => {
    cy.visit('http://localhost:3033/event-guards-third-party-element');
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{ctrl}a', { release: false });
    cy.get('p').should('contain.text', 'Helloa');
  })

  it(`handles third-party event`, () => {
    cy.visit('http://localhost:3033/event-guards-third-party-event');
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{selectall}{backspace}', { release: false });
    cy.get('input[type="text"]').type('World', { release: false });
    cy.get('p').should('contain.text', 'Hello');
    cy.get('input[type="text"]').type('{selectall}{backspace}', { release: false });
    cy.get('input[type="text"]').type('A', { release: false });
    cy.get('p').should('contain.text', 'A');
  })
})

context('server EventHub', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/server-event-hub')
  })

  it(`uses server EventHub`, () => {
    cy.get('#message-from-server').click();
    cy.get('#message-from-server').should('contain.text', `Hello, world!`);
  })
})

context('browser commands emit', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3033/browser-command-emit-debounce')
  })

  it(`debounces`, () => {
    cy.get('#btn-debounce').click()
    cy.get('#event-count').should('have.text', `Events: A`);
  })

  it(`doesn't debounce`, () => {
    cy.get('#btn').click()
    cy.get('#event-count').should('have.text', `Events: AAAAAAAAAA`);
  })
})

context('browser commands with elemenets', () => {
  beforeEach(() => {
  })

  it(`should respect wait in browser command`, () => {
    cy.visit('http://localhost:3033/browser-command-element-wait')
    cy.get('#btn').click()
    cy.get('#text').should('have.text', `Hello World!`);
    cy.get('#error').should('not.have.text', `Cannot set properties of null (setting 'innerText')`);
  })

  it(`should fail if no element is found and wait is not set`, () => {
    cy.visit('http://localhost:3033/browser-command-element-no-wait')
    cy.get('#btn').click()
    cy.get('#text').should('not.have.text', `Hello World!`);
    cy.get('#error').should('have.text', `Cannot set properties of null (setting 'innerText')`);
  })

  it(`should select element using custom selector`, () => {
    cy.visit('http://localhost:3033/browser-command-element-custom-selector')
    cy.get('#btn').click()
    cy.get('#text-id').should('have.text', `Hello World!`);
  })

})