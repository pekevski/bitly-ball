
export class ValidationError extends Error {
    constructor(message: string) {
        super()
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}