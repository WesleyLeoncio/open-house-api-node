export class AuthenticationServiceException extends Error{
    constructor(message) {
        super(message);
        this.name = 'AuthenticationServiceException';
        this.status = 401;
    }
}