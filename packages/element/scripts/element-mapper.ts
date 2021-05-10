import { DomElementSchemaRegistry } from '@angular/compiler';
import { resolve } from 'path';
import { getProgramFromFiles, generateSchema, Definition } from 'typescript-json-schema';

const dom = new DomElementSchemaRegistry();

const getEventName = (optionName) => {
    if (optionName?.length > 2 && optionName.slice(0, 2) === 'on' && optionName[2] === optionName[2].toUpperCase()) {
        return optionName[2].toLowerCase() + optionName.slice(3);
    }
    return null;
};

const angularComponents = {
    'input': 'app-drayman-input-field',
}
const exceptions = {
    '*': {
        'onShortcut': '(keydown)="onShortcut($event, element)"',
        'children': null,
        'style': '[ngStyle]="element.style"'
    },
    'input': {
        'type': '[options]="element.options"',
        'onValueChange': '[options]="element.options"',
        'onValueChangeStart': '[options]="element.options"',
        'updateOnBlur': '[options]="element.options"',
        'disabled': '[options]="element.options"',
        'value': '[options]="element.options"',
    },
    'img': {
        'src': '[src]="domSanitizer.bypassSecurityTrustUrl(element.options.src)"',
    }
}

const getBinding = (el: string, prop: string) => {
    const exception = exceptions[el]?.[prop] || exceptions['*'][prop];
    if (exception === null) {
        return null;
    }
    if (exception) {
        return exception;
    }
    const event = getEventName(prop);
    if (event) {
        return `(${event})="element.options.${prop}()"`;
    }
    const mapped = dom.getMappedPropName(prop);
    if (dom.allKnownAttributesOfElement(el).includes(mapped)) {
        return `[${prop}]="element.options.${prop}"`;
    }
    return `[attr.${prop}]="element.options.${prop}"`
}

export const getAngularElements = (): string => {
    const program = getProgramFromFiles(
        [resolve('node_modules/@drayman/types/types/index.d.ts')]
    );

    const schema = generateSchema(program, 'global.JSX.IntrinsicElements', { ref: false, propOrder: true });
    const angularElements = [];
    for (const elementName of Object.keys(schema.properties)) {
        const element = schema.properties[elementName] as Definition;
        let elementProps = element.properties;
        if (!elementProps && element.anyOf) {
            element.anyOf.forEach(x => elementProps = { ...elementProps, ...(x as any).properties })
        }
        const bindings = [];
        for (const propName of Object.keys(elementProps)) {
            const binding = getBinding(elementName, propName);
            if (binding && !bindings.includes(binding)) {
                bindings.push(binding);
            }
        }
        const angularName = angularComponents[elementName] || elementName;
        angularElements.push(`<ng-container *ngSwitchCase="'${elementName}'">`);
        if (!elementProps.children) {
            angularElements.push(`<${angularName} ${bindings.join(' ')} />`);
        } else {
            angularElements.push(`<${angularName} ${bindings.join(' ')}>`);
            angularElements.push(`<ng-container *ngTemplateOutlet="childrenTemplate; context: {children: element.children}"></ng-container>`);
            angularElements.push(`</${angularName}>`);
        }
        angularElements.push(`</ng-container>`);
    }
    return angularElements.join('\n');
};