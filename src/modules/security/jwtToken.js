import 'dotenv/config';
import jwt from "jsonwebtoken";

export class JwtToken {

    constructor() {
        this.secret = process.env.SECRET;
    }

    gerarToken(user){
        const token = jwt.sign({
                id: user.id,
                nome: user.nome,
                login: user.login,
            },
            this.secret,
            { expiresIn: "2h" }
        );
        return {token};
    }


    verificarToken(token){
      return jwt.verify(token, this.secret);
    }

}