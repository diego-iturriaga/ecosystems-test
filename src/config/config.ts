export default{
    /* JWT CONFIG */
    jwtSecret: process.env.JWT_SECRET || 'holamundo',

    /* API CONFIG */
    apiPrefix: "api",
    apiVersion: "v1",

    /* WEB SERVICE CONFIG */
    port: process.env.SERVER_PORT || 8000,

    /* DB CONFIG */
    dbName: "ecosystem-test",
    dbUsername: process.env.DB_USERNAME || "root",
    dbPassword: process.env.DB_PASSWORD || "toor",
    dbPath: "./db.sqlite3"
}