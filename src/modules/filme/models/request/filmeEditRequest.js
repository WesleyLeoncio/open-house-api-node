export class FilmeEditRequest {
    constructor(dados) {
        this.id = dados.params.id;
        this.nome = dados.body.nome;
        this.descricao = dados.body.descricao;
        this.dataLancamento = dados.body.dataLancamento;
        this.duracao = dados.body.duracao;
        this.imagem = dados.body.imagem;
        this.categorias = dados.body.categorias;
    }

    getFilme() {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            dataLancamento: this.dataLancamento,
            duracao: this.duracao,
            imagem: this.imagem,
        }
    }

    getCategoria(){
        return this.categorias;
    }
}