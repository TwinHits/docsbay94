export interface DocumentationResponse {
    classes: ClassResponse[];
}

export interface ClassResponse {
    name: string;
    description: string;
    methods: MethodResponse[];
}

export interface MethodResponse {
    name: string;
    description: string;
    parameters: ParameterResponse[];
    returns: Type;
}

export interface ParameterResponse {
    name: string;
    type: Type;
    description: string;
}

export type Type = 'string' | 'boolean' | 'tientity' | 'float' | 'integer' | 'Vector2f' | 'Vector2i';
