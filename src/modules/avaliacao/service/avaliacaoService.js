import { Pageable } from "#utils/pageable.js";
import { Avaliacao } from "#avaliacao/models/entity/avaliacao.js";
import { AvaliacaoResponse } from "#avaliacao/models/response/AvaliacaoResponse.js";


export class AvaliacaoService {
    static async findAll(req) {
        const pageable = new Pageable(req.query);

        return await Avaliacao.findAndCountAll({
            include: {all: true, nested: true},
            distinct: true,
            col: "filme_id",
            limit: pageable.limit,
            offset: pageable.offset,
            where: pageable.getFilter('nota'),
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }


    static async findAllByUserId(req) {
        const {id} = req.params;
        const pageable = new Pageable(req.query);

        return await Avaliacao.findAndCountAll({
            include: {all: true, nested: true},
            distinct: true,
            col: "filme_id",
            limit: pageable.limit,
            offset: pageable.offset,
            where: [{usuario_id: id},pageable.getFilter('nota')],
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }


}