import { RoleResponse } from "#role/models/response/roleResponse.js";

export class UsuarioResponse {

    constructor(usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.status = usuario.status;
        this.roles = usuario.roles.map(r => new RoleResponse(r));
    }
}