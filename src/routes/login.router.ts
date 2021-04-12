import { Application } from "express";
import UserLoginController from "../controllers/user-login";
import TokenCreator from "../utils/token.creator";

export default function (app: Application, userLoginController: UserLoginController, tokenCreator: TokenCreator) {
    // Get payload and process with JWT.
    app.post( "/", async (req, res ) => {
        if(!req.body.username || !req.body.password){
            return res.status(400).json({msg: 'Please send you username and password.'});
        }

        await userLoginController.login(req.body.username, req.body.password)
        .then((usr: any) => {
            if(!usr)
                return res.status(400).json({msg: 'Username and password do not match.'});
            const token = tokenCreator.createToken(usr);
            return res.status(200).json({'token': token});
        });
    });
}