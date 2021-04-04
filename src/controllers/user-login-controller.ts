import IUserLogin from "../interfaces/interface-userlogin-controller";


class UserLoginController implements IUserLogin{
    login(username: string, password: string): [boolean, any] {
        throw new Error("Method not implemented.");
    }
}

export default UserLoginController;