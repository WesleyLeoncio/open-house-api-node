import {CategoriaResponse} from "#categoria/models/response/categoriaResponse.js";

class FilmeResponse {
    constructor(filme) {
        this.id = filme.id;
        this.nome = filme.nome;
        this.dataLancamento = filme.dataLancamento;
        this.duracao = filme.duracao;
        this.imagem = filme.imagem;
        this.categorias = filme.categorias.map(c => new CategoriaResponse(c));
    }

}

export { FilmeResponse }