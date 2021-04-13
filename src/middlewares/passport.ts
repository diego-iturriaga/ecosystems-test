import { ExtractJwt, Strategy, StrategyOptions, VerifyCallbackWithRequest } from "passport-jwt";
import config from "../config/config";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    passReqToCallback: true
};

export default new Strategy(opts, (...[req, token, done]: Parameters<VerifyCallbackWithRequest>)=> {
    if (!token){
        return done(null, false);
    }
    try {
        return done(null, token.id);
      } catch (error) {
        done(error);
      }  
})