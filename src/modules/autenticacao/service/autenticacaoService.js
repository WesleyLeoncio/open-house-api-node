import { UsuarioService } from "#usuario/service/usuarioService.js";
import { Bcrypt } from "#security/bcrypt.js";
import { JwtToken } from "#security/jwtToken.js";
import { CredentialsException} from "#exceptions/credentialsException.js";

export class AutenticacaoService {

    static async login(authRequest) {

        const user = await UsuarioService.userByLogin(authRequest.login);

        const checkPassword = await Bcrypt.checkPassword(authRequest.senha, user.senha);
        if (!checkPassword) throw new CredentialsException("Senha incorreta!")

        const jwtToken = new JwtToken();


        return jwtToken.gerarToken(user);
    }


}