import { IElements } from "./types";

export * from './types';

export const elements: IElements = {
    '*': {
        attributes: {
            style: {
                description: `Inline style for an element.`,
                ng: '[ngStyle]="element.style"'
            },
            tabindex: {
                description: 'The tabindex global attribute indicates that its element can be focused, and where it participates in sequential keyboard navigation.',
                ng: '[attr.tabindex]="element.options.tabindex"',
            },
            onShortcut: {
                description: `
                    This attribute sets up a callback function that will be called whenever user presses specific key or key combination.

                    To set up shortcut, provide required key combination to \`onShortcut\` attribute after colon symbol: \`onShortcut:enter\`, \`onShortcut:ctrl+i\`.

                    Make sure that an element is focusable, otherwise \`onShortcut\` won't work.

                    Because JSX syntax doesn’t allow special characters in attribute names (like : or +), you need to use spread attributes technique to set up onShortcut:

                    Don’t:
                    \`<div onShortcut:ctrl+i={handleShortcut}></div>\`

                    Do:
                    \`<div {...{ 'onShortcut:ctrl+i': handleShortcut }}></div>\`
                `,
                ng: '(keydown)="onShortcut($event, element)"'
            },
            key: {
                description: `
                    Keys help identify which items have changed, added, or removed. Keys can be given to the elements inside the array to give the elements a stable identity.
                `,
            }
        }
    },
    h1: {
        description: 'Heading level 1.'
    },
    h2: {
        description: 'Heading level 2.'
    },
    h3: {
        description: 'Heading level 3.'
    },
    h4: {
        description: 'Heading level 4.'
    },
    h5: {
        description: 'Heading level 5.'
    },
    h6: {
        description: 'Heading level 6.'
    },
    td: {
        description: 'Defines a cell of a table.',
        attributes: {
            colspan: {
                description: 'This attribute contains a non-negative integer value that indicates for how many columns the cell extends.',
                ng: '[attr.colspan]="element.options.colspan"',
            },
            rowspan: {
                description: 'This attribute contains a non-negative integer value that indicates for how many rows the cell extends.',
                ng: '[attr.rowspan]="element.options.rowspan"'
            },
        }
    },
    th: {
        description: 'Defines a cell as header of a group of table cells.',
        attributes: {
            colspan: {
                description: 'This attribute contains a non-negative integer value that indicates for how many columns the cell extends.',
                ng: '[attr.colspan]="element.options.colspan"',
            },
            rowspan: {
                description: 'This attribute contains a non-negative integer value that indicates for how many rows the cell extends.',
                ng: '[attr.rowspan]="element.options.rowspan"'
            },
        }
    },
    span: {
        description: 'Generic inline container for phrasing content, which does not inherently represent anything.',
    },
    div: {
        description: 'Generic container for flow content.',
    },
    table: {
        description: 'Represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.',
    },
    tbody: {},
    thead: {},
    tfoot: {},
    button: {
        description: 'Clickable button used to perform server-side actions.',
        attributes: {
            onClick: {
                description: 'Specifies `async` action to run when element is clicked.',
                ng: '(click)="element.options.onClick()"'
            },
            disabled: {
                description: 'Prevents user from interacting with the button. Can be `true` or `false`.',
                ng: '[disabled]="element.options.disabled"',
            }
        }
    },
    img: {
        empty: true,
        description: 'Embeds an image into the document.',
        attributes: {
            src: {
                description: 'Path to the image you want to embed.',
                ng: '[src]="element.options.src"',
            },
            alt: {
                description: 'Holds a text description of the image.',
                ng: '[alt]="element.options.alt"',
            }
        }
    },
    input: {
        description: 'Used to create interactive controls in order to accept data from the user.',
        attributes: {
            type: {
                description: '',
                ng: '[options]="element.options"',
            },
            onValueChange: {
                description: 'Server-side function executed with an input value from user.',
                ng: '[options]="element.options"',
            },
            onValueChangeStart: {
                description: 'Server-side function executed when user starts typing.',
                ng: '[options]="element.options"',
            },
            updateOnBlur: {
                description: 'Whether value of the field should be emitted when user is blurred out of the control.',
                ng: '[options]="element.options"',
            },
            disabled: {
                description: 'Whether the control is disabled.',
                ng: '[options]="element.options"',
            },
            value: {
                description: 'Value of the input.',
                ng: '[options]="element.options"',
            },
        },
        ng: 'app-drayman-input-field',
    }
}