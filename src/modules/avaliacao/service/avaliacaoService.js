import { Avaliacao } from "#avaliacao/models/entity/avaliacao.js";
import { AvaliacaoResponse } from "#avaliacao/models/response/AvaliacaoResponse.js";
import { Filme } from "#filme/models/entity/filme.js";
import { Categoria } from "#categoria/models/entity/categoria.js";

export class AvaliacaoService {

    static async findAll(pageable) {
        return await Avaliacao.findAndCountAll({
            include: [
                {
                    model: Filme,
                    as: 'filme',
                    include: [
                        {
                            model: Categoria,
                            as: 'categorias',
                            attributes: ['id', 'nome']
                        }
                    ]
                }
            ],
            distinct: true,
            col: "created_at",
            limit: pageable.limit,
            offset: pageable.offset,
            where: pageable.getFilter('nota'),
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }

    static async findAllByUserId(avaliacaoRequest) {
        return await Avaliacao.findAndCountAll({
            include: [
                {
                    model: Filme,
                    as: 'filme',
                    include: [
                        {
                            model: Categoria,
                            as: 'categorias',
                            attributes: ['id', 'nome']
                        }
                    ]
                }
            ],
            distinct: true,
            col: "filme_id",
            limit: avaliacaoRequest.pageable.limit,
            offset: avaliacaoRequest.pageable.offset,
            where: [{usuario_id: avaliacaoRequest.id}, avaliacaoRequest.pageable.getFilter('nota')],
        })
            .then(data =>
                avaliacaoRequest.pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }

    static async findByNotaAvaliacao(req) {
        const {filmeId, usuarioId} = req.params;
        const avaliacao = await this.buscarAvaliacao(filmeId, usuarioId);
        return {nota: avaliacao.nota}
    }

    static async realizarAvaliacao(avaliacaoRequest) {
        return this.verificarAvaliacao(avaliacaoRequest);
    }


    //TODO REGRA DE NEGOCIO TEMPORARIA
    static async verificarAvaliacao(obj) {
        let avaliacao = await this.buscarAvaliacao(obj.filmeId, obj.usuarioId);
        if (avaliacao == null) {
            await Avaliacao.create(obj);
        } else {
            Object.assign(avaliacao, obj);
            await avaliacao.save();
        }
    }

    static async buscarAvaliacao(idFilme, idUsuario) {
        return await Avaliacao.findOne({
            where: {filmeId: idFilme, usuarioId: idUsuario}
        });
    }


}