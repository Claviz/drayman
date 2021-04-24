export interface IElements {
    [elementName: string]: IElement;
}

export interface IElement {
    empty?: boolean;
    ng?: string;
    description?: string;
    attributes?: IAttributes;
}

export interface IAttributes {
    [attributeName: string]: IAttribute;
}

export interface IAttribute {
    description?: string;
    ng?: string;
}