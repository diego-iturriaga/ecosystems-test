import User from "../models/user";

interface IUserLogin{
    // point 1
    // [true and ""] OR [false and "error message"]
    login(username: string, password: string): Promise<void | User | null>;
}

export default IUserLogin;