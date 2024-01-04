export class RoleEditRequest {
    constructor(dados) {
        this.id = dados.params.id ;
        this.nome = dados.body.nome;
    }
}