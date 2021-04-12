import bcrypt from "bcrypt";

class Crypto{
    saltRounds: number = 10;
    hash(text: string): string {
        return bcrypt.hashSync(text, this.saltRounds);
    }
    validPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}
export default Crypto;