import compression from "compression";
import cors from "cors";
import express, { Router } from "express";
import passport from "passport";
import { Sequelize } from 'sequelize-typescript';
import config from "./config/config";
import UserLoginController from "./controllers/user-login";
import passportMiddleware from "./middlewares/passport";
import loginRouter from "./routes/login.router";
import userRouter from "./routes/user.router";
import TokenCreator from "./utils/token.creator";

class Server{
    // Express initialization.
    public app;
    public sequelize;

    constructor(){
        // Sequelize database configuration.
        this.sequelize = new Sequelize({
        database: config.dbName,
        dialect: 'sqlite',
        username: config.dbUsername,
        password: config.dbPassword,
        storage: config.dbPath,
        models: [__dirname + '/models'] // or [Player, Team],
        })
        // Sequelize initialization and sync database.
        /*this.sequelize
                .sync({force: true})
                .then(() => {
                    // tslint:disable-next-line:no-console
                    console.log('database created!');
                })
                .catch(() => {
                    throw new Error("Error initializing database.");
                });
        */
        // Express initialization.
        this.app = express();

        // middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    }

    start(): void{
        // Route creations.
        const router: Router = express.Router();
        loginRouter(this.app, 
            new UserLoginController(), 
            new TokenCreator());

        userRouter(this.app);

        // first level routing
        //this.app.use(`/${config.apiPrefix}/${config.apiVersion}`, router);

        // Run server!
        this.app.listen(config.port, () => {
            // tslint:disable-next-line:no-console
            console.log( `server started at http://localhost:${ config.port }` );
        } );
    }
}

const s = new Server();
s.start();