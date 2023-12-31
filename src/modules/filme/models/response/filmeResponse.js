import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";

export class FilmeResponse {
    constructor(filme) {
        this.id = filme.id;
        this.nome = filme.nome;
        this.dataLancamento = filme.dataLancamento;
        this.duracao = filme.duracao;
        this.imagem = filme.imagem;
        this.descricao = filme.descricao;
        this.categorias = filme.categorias.map(c => new CategoriaResponse(c));
    }

}
