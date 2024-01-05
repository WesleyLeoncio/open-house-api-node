
export class UsuarioBasicResponse {
    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.login = usuario.login;
        this.senha = usuario.senha;
        this.status = usuario.status;
    }

}