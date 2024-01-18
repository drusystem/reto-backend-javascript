export class EmptyValueError extends Error {
    constructor(message: string = 'El valor no puede ser vacío.') {
        super(message);
        this.name = 'EmptyValueError';
    }
}