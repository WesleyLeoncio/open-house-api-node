import { UsuarioService } from "#usuario/service/usuarioService.js";
import { Bcrypt } from "#security/bcrypt.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
export class AutenticacaoService {
    //TODO REFATORAR
    static async login(req) {
        const {login, senha} = req.body;

        //TODO VALIDAR
        const user = await UsuarioService.userByLogin(login);

        //TODO VALIDAR
        const checkPassword = await Bcrypt.checkPassword(senha, user.senha)

        const secret =  process.env.SECRET;


        const token = jwt.sign({
            id: user.id,
            nome: user.nome,
            login: user.login,
        },
        secret
        );

        return {token};
    }


}