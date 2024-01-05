export  class AvaliacaoByUserIdResquest {
    constructor(dados, pageable) {
        this.id = dados.id;
        this.pageable = pageable;
    }
}