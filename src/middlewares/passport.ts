import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/user";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, (payload, done)=> {
    User.findByPk(payload.id).then(usr => {
        if(usr){
            return done(null, usr);
        }
        return done(null, false);
    });
})