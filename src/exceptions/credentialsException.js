export class CredentialsException extends Error{
    constructor(message) {
        super(message);
        this.name = 'CredentialsException';
        this.status = 401;
    }
}