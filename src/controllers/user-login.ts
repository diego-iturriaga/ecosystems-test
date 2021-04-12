import User from "../models/user";

class UserLoginController{
    login(username: string, password: string): Promise<void | User | null>{
        return User.findOne({where: {username}}).then(usr=>{
            if(!usr)
                return null;
            const isMatch: boolean = usr.validatePassword(password);
            if(isMatch){
                usr.setLastLogin(new Date());
                usr.save();
                return usr;
            }else{
                return null;
            }
        });
    }
}

export default UserLoginController;