import bcrypt from "bcrypt";

export class Bcrypt {

    static async passwordHash(password){
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt)
    }

    static async checkPassword (password, userPassword){
        return bcrypt.compare(password, userPassword);
    }


}