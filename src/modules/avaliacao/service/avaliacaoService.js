import { Avaliacao } from "#avaliacao/models/entity/avaliacao.js";
import { AvaliacaoResponse } from "#avaliacao/models/response/AvaliacaoResponse.js";
import { Filme } from "#filme/models/entity/filme.js";
import { Categoria } from "#categoria/models/entity/categoria.js";
import { NotaResponse } from "#avaliacao/models/response/notaResponse.js";

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

    static async findAllByUserId(avaliacaoByUserIdResquest) {
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
            limit: avaliacaoByUserIdResquest.pageable.limit,
            offset: avaliacaoByUserIdResquest.pageable.offset,
            where: [{usuario_id: avaliacaoByUserIdResquest.id}, avaliacaoByUserIdResquest.pageable.getFilter('nota')],
        })
            .then(data =>
                avaliacaoByUserIdResquest.pageable.getPagingData(data.count, data.rows.map(a => new AvaliacaoResponse(a))));
    }

    static async findByNotaAvaliacao(avaliacaoByNotaRequest) {
        const avaliacao = await this.buscarAvaliacao(avaliacaoByNotaRequest);
        return new NotaResponse(avaliacao);
    }

    static async realizarAvaliacao(avaliacaoRequest) {
        return this.verificarAvaliacao(avaliacaoRequest);
    }


    //TODO REGRA DE NEGOCIO TEMPORARIA
    static async verificarAvaliacao(avaliacaoRequest) {
        let avaliacao = await this.buscarAvaliacao(avaliacaoRequest);
        if (avaliacao == null) {
            await Avaliacao.create(avaliacaoRequest);
        } else {
            Object.assign(avaliacao, avaliacaoRequest);
            await avaliacao.save();
        }
    }

    static async buscarAvaliacao(avaliacaoByNotaRequest) {
        return await Avaliacao.findOne({
            where: {filmeId: avaliacaoByNotaRequest.filmeId, usuarioId: avaliacaoByNotaRequest.usuarioId}
        });
    }


}