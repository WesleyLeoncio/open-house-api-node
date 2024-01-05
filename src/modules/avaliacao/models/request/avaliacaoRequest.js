export class AvaliacaoRequest {
    constructor(dados) {
        this.filmeId = dados.idFilme;
        this.usuarioId = dados.idUsuario;
        this.nota = dados.nota;
    }
}