import { UsuarioService } from "#usuario/service/usuarioService.js";
import { Bcrypt } from "#security/bcrypt.js";
import { JwtToken } from "#security/jwtToken.js";
export class AutenticacaoService {
    //TODO REFATORAR
    static async login(authRequest) {

        //TODO VALIDAR
        const user = await UsuarioService.userByLogin(authRequest.login);
        if (!user) throw "Usuario incorreto!";

        //TODO VALIDAR
        const checkPassword = await Bcrypt.checkPassword(authRequest.senha, user.senha);
        if (!checkPassword) throw "Senha incorreta!";

        const jwtToken = new JwtToken();


        return jwtToken.gerarToken(user);
    }


}