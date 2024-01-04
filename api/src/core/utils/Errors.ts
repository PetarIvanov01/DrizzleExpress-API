interface ValidationErrorInstance {
    name: string;
    message: string;
    errors: any[];
};

export class ValidationError implements ValidationErrorInstance {
    name: string;
    message: string;
    errors: any[];

    constructor(name: string, message: string, errors: any[]) {
        this.name = name;
        this.message = message;
        this.errors = errors;
    }
};