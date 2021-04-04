
interface IUserLogin{
    // point 1
    // [true and ""] OR [false and "error message"]
    login(username: string, password: string): [boolean, any];
}

export default IUserLogin;