export class UsuarioCreatComunRequest {
    constructor(dados) {
        this.nome = dados.nome;
        this.login = dados.login;
        this.senha = dados.senha;
        this.status = true;
    }
}