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
            where: [{usuario_id: id}, pageable.getFilter('nota')],
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }

    static async realizarAvaliacao(req) {
        const {idFilme, idUsuario, nota} = req.body;
        let obj = {usuarioId: idUsuario, filmeId: idFilme, nota: nota};
        return this.verificarAvaliacao(obj);
    }

    static async verificarAvaliacao(obj) {
        let avaliacao = await Avaliacao.findOne({
            where: {usuarioId: obj.usuarioId, filmeId: obj.filmeId}
        });
        if (avaliacao == null) {
            avaliacao = await Avaliacao.create(obj);
        }else{
            Object.assign(avaliacao, obj);
            await avaliacao.save();
        }
        return avaliacao;
    }

}