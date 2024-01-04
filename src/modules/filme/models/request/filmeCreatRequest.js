export class FilmeCreatRequest {
    constructor(dados) {
        this.nome = dados.nome;
        this.descricao = dados.descricao;
        this.dataLancamento = dados.dataLancamento;
        this.duracao = dados.duracao;
        this.imagem = dados.imagem;
        this.categorias = dados.categorias;
    }

    getFilme() {
        return {
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