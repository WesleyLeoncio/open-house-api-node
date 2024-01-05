export class AuthRequest {
    constructor(dados) {
        this.login = dados.login;
        this.senha = dados.senha;
    }
}