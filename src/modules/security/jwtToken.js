import 'dotenv/config';
import jwt from "jsonwebtoken";

export class JwtToken {

    constructor(user) {
        this.user = user;
        this.secret = process.env.SECRET;
    }

    gerarToken(){
        const token = jwt.sign({
                id: this.user.id,
                nome: this.user.nome,
                login: this.user.login,
            },
            this.secret,
            { expiresIn: "2h" }
        );
        return {token};
    }

}