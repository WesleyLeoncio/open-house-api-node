import {AutenticacaoService} from "#autenticacao/service/autenticacaoService.js";
import { AuthRequest } from "#autenticacao/models/request/authRequest.js";

export class AutenticacaoController {

    static async login(req, res, next) {
        AutenticacaoService.login(new AuthRequest(req.body))
            .then(obj => res.json(obj))
            .catch(next);
    }
}