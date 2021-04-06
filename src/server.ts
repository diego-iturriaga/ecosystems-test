import express, { Router } from "express";
import { Sequelize } from 'sequelize-typescript';
import compression from "compression";
import cors from "cors";
import passport from "passport";

import User from "./models/user";
import Client from "./models/client";
import Transaction from "./models/transaction";
import TransactionDetail from "./models/transaction-detail";

import userRouter from "./routes/user-router"
import loginRouter from "./routes/login-router"
import config from "./config/config";

import passportMiddleware from "./middlewares/passport";

class Server{
    // Express initialization.
    public app;

    constructor(){
        // Sequelize database configuration.
        const sequelize = new Sequelize({
        database: config.dbName,
        dialect: 'sqlite',
        username: config.dbUsername,
        password: config.dbPassword,
        storage: config.dbPath,
        models: [__dirname + '/models'] // or [Player, Team],
        })
        // Sequelize initialization and sync database.
        sequelize
                .sync()
                .then(() =>
                    // tslint:disable-next-line:no-console
                    console.log('database created!')
                )
                .catch(() => {
                    throw new Error("Error initializing database.");
                });

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
        const router: Router = express.Router()
        router.use("/login", loginRouter);
        router.use("/user", passport.authenticate('jwt', {session: false}), userRouter);

        // first level routing
        this.app.use(`/${config.apiPrefix}/${config.apiVersion}`, router);

        // Run server!
        this.app.listen(config.port, () => {
            // tslint:disable-next-line:no-console
            console.log( `server started at http://localhost:${ config.port }` );
        } );
    }
}

const s = new Server();
s.start();