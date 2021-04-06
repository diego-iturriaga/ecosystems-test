import IUserLogin from "../interfaces/interface-userlogin-controller";
import User from "../models/user";

class UserLoginController{
    login(username: string, password: string): Promise<void | User | null>{
        return User.findOne({where: {username}}).then(usr=>{
            if(!usr)
                return null;
            const isMatch: boolean = usr.validatePassword(password);
            if(isMatch){
                return usr;
            }else{
                return null;
            }
        }).catch(err=>{
            // tslint:disable-next-line:no-console
            console.log(err);
        });
    }
}

export default UserLoginController;