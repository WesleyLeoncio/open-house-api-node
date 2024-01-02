import {AutenticacaoService} from "#autenticacao/service/autenticacaoService.js";

export class AutenticacaoController {

    static async login(req, res, next) {
        AutenticacaoService.login(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}