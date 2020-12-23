export default interface TIEngineDocumentation {
    interfaces: Class[];
}

export interface Class {
    name: string;
    description: string;
    methods: Method[];
}

export interface Method {
    name: string;    
    description: string;
    parameters: Parameter[];
    returns: Type;
}

export interface Parameter {
    name: string;
    description: string;
    type: Type;
}

export type Type = 'string' | 'boolean' | 'tientity' | 'float' | 'integer' | 'Vector2f' | 'Vector2i';