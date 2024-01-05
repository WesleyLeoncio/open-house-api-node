export class UsuarioCreatRequest {
    constructor(dados) {
        this.nome = dados.nome;
        this.login = dados.login;
        this.senha = dados.senha;
        this.roles = dados.roles;
        this.status = true;
    }

    getUsuario(){
        return {
            nome: this.nome,
            login: this.login,
            senha: this.senha,
            status: this.status
        }
    }

    getRoles(){
        return this.roles;
    }
}