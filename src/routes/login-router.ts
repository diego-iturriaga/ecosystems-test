import express from "express";
import IUserLogin from "../interfaces/interface-userlogin-controller";
import UserLoginController from "../controllers/user-login-controller";
import {createToken} from "../utils/token-creator";

const router = express.Router();

const userLoginController: IUserLogin = new UserLoginController();

// Get payload and process with JWT.
router.post( "/", ( req, res ) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({msg: 'Please send you username and password.'});
    }

    userLoginController.login(req.body.username, req.body.password)
    .then(usr => {
        if(!usr)
            return res.status(400).json({msg: 'The user does not exists.'});
        return res.status(200).json({token: createToken(usr)});
    }).catch(err => {
        return res.status(500).json({msg: 'An error has occurred.'});
    });
} );

export default router;