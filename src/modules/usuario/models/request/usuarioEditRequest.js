export class UsuarioEditRequest {
    constructor(dados) {
        this.id = dados.params.id;
        this.nome = dados.body.nome;
        this.login = dados.body.login;
        this.senha = dados.body.senha;
        this.roles = dados.body.roles;
        this.status = true;
    }

    getUsuario(){
        return {
            id: this.id,
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