import jwt from "jsonwebtoken";
import { UserDocument } from "../repositories/user.repository";
import config from "../config/config";

export function createToken(user:UserDocument): string{
    return jwt.sign({id: user.id, username:user.username}, config.jwtSecret, {expiresIn: 86400});
}
