import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "../config/config";

class TokenCreator {
    createToken(user:User): string{
        return jwt.sign({id: user.id, username:user.getUsername}, config.jwtSecret, {expiresIn: 86400});
    }
}

export default TokenCreator;