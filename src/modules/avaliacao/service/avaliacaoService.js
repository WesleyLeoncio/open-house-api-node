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

    static async findByNotaAvaliacao(req) {
        const {filmeId, usuarioId} = req.params;
        const avaliacao = await this.buscarAvaliacao(filmeId, usuarioId);
        return {nota: avaliacao.nota}
    }

    static async realizarAvaliacao(req) {
        const {idFilme, idUsuario, nota} = req.body;
        let obj = {usuarioId: idUsuario, filmeId: idFilme, nota: nota};
        return this.verificarAvaliacao(obj);
    }


    //TODO RECLA DE NEGOCIO TEMPORARIA
    static async verificarAvaliacao(obj) {
        let avaliacao = await this.buscarAvaliacao(obj.usuarioId, obj.filmeId);

        if (avaliacao == null) {
            avaliacao = await Avaliacao.create(obj);
        } else {
            Object.assign(avaliacao, obj);
            await avaliacao.save();
        }
        return avaliacao;
    }

    static async buscarAvaliacao(idFilme, idUsuario) {
        return await Avaliacao.findOne({
            where: {usuarioId: idUsuario, filmeId: idFilme}
        });
    }


}