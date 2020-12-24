import {
    ClassResponse,
    DocumentationResponse,
    MethodResponse,
    ParameterResponse,
    Type,
} from '@/api/types/documentation';

import * as Utils from '@/common/utils';

export class Parameter {
    constructor(parameterResponse: ParameterResponse) {
        this.name = parameterResponse.name;
        this.type = parameterResponse.type;
        this.description = parameterResponse.description;
        this.display = true;
    }

    name: string;
    type: Type;
    description: string;
    display: boolean;

    public searchChildren(searchTerm: string): boolean {
        if (
            !searchTerm ||
            Utils.doesStringInclude(this.name, searchTerm) ||
            Utils.doesStringInclude(this.description, searchTerm)
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export class Method {
    constructor(methodResponse: MethodResponse) {
        this.name = methodResponse.name;
        this.returns = methodResponse.returns;
        this.description = methodResponse.description;
        this.parameters = methodResponse.parameters ? methodResponse.parameters.map((p) => new Parameter(p)) : [];
        this.display = true;
    }

    name: string;
    returns: Type;
    description: string;
    parameters: Parameter[];
    display: boolean;

    public searchChildren(searchTerm: string): boolean {
        if (
            !searchTerm ||
            Utils.doesStringInclude(this.name, searchTerm) ||
            Utils.doesStringInclude(this.description, searchTerm)
        ) {
            this.display = true;
        } else {
            this.display = this.parameters.map((p) => p.searchChildren(searchTerm)).includes(true);
        }
        return this.display;
    }
}

export class Class {
    constructor(classResponse: ClassResponse) {
        this.name = classResponse.name;
        this.description = classResponse.description;
        this.methods = classResponse.methods ? classResponse.methods.map((m) => new Method(m)) : [];
        this.display = true;
    }

    name: string;
    description: string;
    methods: Method[];
    display: boolean;

    public searchChildren(searchTerm: string): boolean {
        if (
            !searchTerm ||
            Utils.doesStringInclude(this.name, searchTerm) ||
            Utils.doesStringInclude(this.description, searchTerm)
        ) {
            this.display = true;
        } else {
            this.display = this.methods.map((m) => m.searchChildren(searchTerm)).includes(true);
        }
        return this.display;
    }
}

export class Documentation {
    constructor(documentationResponse: DocumentationResponse) {
        this.classes = documentationResponse.classes ? documentationResponse.classes.map((c) => new Class(c)) : [];
        this.display = true;
    }

    classes: Class[];
    display: boolean;

    public searchChildren(searchTerm: string): boolean {
        for (const c of this.classes) {
            c.searchChildren(searchTerm);
        }
        return this.display;
    }
}
