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

    static async realizarAvaliacao(req, res, next) {
        AvaliacaoService.realizarAvaliacao(req)
            .then(objs => res.status(204).json(objs))
            .catch(next);
    }

    static async buscarNotaAvaliacao(req, res, next) {
        AvaliacaoService.findByNotaAvaliacao(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

}