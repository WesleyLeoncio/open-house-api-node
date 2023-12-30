import { FilmeResponse } from "#filme/models/response/filmeResponse.js";

export class AvaliacaoResponse {

    constructor(avaliacao) {
        this.nota = avaliacao.nota;
        this.filmes = new FilmeResponse(avaliacao.filme);
    }


}