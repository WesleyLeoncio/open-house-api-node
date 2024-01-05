import { AvaliacaoService } from "#avaliacao/service/avaliacaoService.js";
import { Pageable } from "#utils/pageable.js";
import { AvaliacaoRequest } from "#avaliacao/models/request/avaliacaoRequest.js";
import { AvaliacaoByUserIdResquest } from "#avaliacao/models/request/avaliacaoByUserIdResquest.js";
import { AvaliacaoByNotaRequest } from "#avaliacao/models/request/avaliacaoByNotaRequest.js";

export class AvaliacaoController {
    static async buscarTodasAvaliacoes(req, res, next) {
        const pageable = new Pageable(req.query);
        AvaliacaoService.findAll(pageable)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarTodasAvaliacoesPorUsuario(req, res, next) {
        const pageable = new Pageable(req.query);
        AvaliacaoService.findAllByUserId(new AvaliacaoByUserIdResquest(req.params, pageable))
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async realizarAvaliacao(req, res, next) {
        AvaliacaoService.realizarAvaliacao(new AvaliacaoRequest(req.body))
            .then(objs => res.status(204).json(objs))
            .catch(next);
    }

    static async buscarNotaAvaliacao(req, res, next) {
        AvaliacaoService.findByNotaAvaliacao(new AvaliacaoByNotaRequest(req.params))
            .then(objs => res.json(objs))
            .catch(next);
    }

}