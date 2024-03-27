interface ValidationErrorInstance {
    message: string;
    errors: any[];
}

interface AuthorizationErrorInstance {
    message: string;
}

export class ValidationError implements ValidationErrorInstance {
    message: string;
    errors: any[];

    constructor(message: string, errors: any) {
        this.message = message;
        this.errors = errors;
    }
}

export class AuthorizationError implements AuthorizationErrorInstance {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
