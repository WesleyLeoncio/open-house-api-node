import { AvaliacaoService } from "#avaliacao/service/avaliacaoService.js";

export class AvaliacaoController {
    static async buscarTodasAvaliacoes(req, res, next) {
        AvaliacaoService.findAll(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarTodasAvaliacoesPorUsuario(req, res, next) {
        AvaliacaoService.findAllByUserId(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

}