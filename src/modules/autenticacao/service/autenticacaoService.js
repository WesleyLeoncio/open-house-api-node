import { UsuarioService } from "#usuario/service/usuarioService.js";
import { Bcrypt } from "#security/bcrypt.js";
import { JwtToken } from "#security/jwtToken.js";
export class AutenticacaoService {
    //TODO REFATORAR
    static async login(req) {
        const {login, senha} = req.body;

        //TODO VALIDAR
        const user = await UsuarioService.userByLogin(login);
        if (!user) throw "Usuario incorreto!";

        //TODO VALIDAR
        const checkPassword = await Bcrypt.checkPassword(senha, user.senha);
        if (!checkPassword) throw "Senha incorreta!";

        const jwtToken = new JwtToken(user);



        return jwtToken.gerarToken();
    }


}