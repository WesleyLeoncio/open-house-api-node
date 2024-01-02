import { RoleResponse } from "#role/models/response/roleResponse.js";

export class UsuarioDetailedResponse{
    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.login = usuario.login;
        this.senha = usuario.senha;
        this.status = usuario.status;
        this.roles = usuario.roles.map(r => new RoleResponse(r));
    }
}