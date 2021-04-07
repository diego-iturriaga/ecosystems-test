import { ExtractJwt, Strategy, StrategyOptions, VerifyCallbackWithRequest } from "passport-jwt";
import config from "../config/config";
import User from "../models/user";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    passReqToCallback: true
};

export default new Strategy(opts, (...[req, token, done]: Parameters<VerifyCallbackWithRequest>)=> {
    if (!token){
        return done(null, false);
    }

    if (req.params.userId !== token.id) {
        return done(new Error("Unauthorized"));
    }
    User.findByPk(token.id).then(usr => {
        if(usr){
            return done(null, usr);
        }
        return done(null, false);
    });
})