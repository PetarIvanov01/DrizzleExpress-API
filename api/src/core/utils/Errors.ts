interface ValidationErrorInstance {
  message: string;
  errors: any[];
}

export class ValidationError implements ValidationErrorInstance {
  message: string;
  errors: any[];

  constructor(message: string, errors: any) {
    this.message = message;
    this.errors = errors;
  }
}
