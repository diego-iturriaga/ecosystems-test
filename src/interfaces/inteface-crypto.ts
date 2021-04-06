interface ICrypto{
    // Receives a passwords and returns a hashed string.
    hash(text: string): string;

    // Receives two a plain text 'password' and a 'hash' password, returns true if they match.
    validPassword(password: string, hash: string): boolean;
}
export default ICrypto;