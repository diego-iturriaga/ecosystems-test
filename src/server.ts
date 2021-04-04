import express, { Router } from "express";
import { Sequelize } from 'sequelize-typescript'

import User from "./models/user";
import Client from "./models/client";
import Transaction from "./models/transaction";
import TransactionDetail from "./models/transaction-detail";

import userRouter from "./routes/user-router"
import loginRouter from "./routes/login-router"

// Sequelize database configuration.
const sequelize = new Sequelize({
  database: 'ecosystem-test',
  dialect: 'sqlite',
  username: 'root',
  password: 'toor',
  storage: './db.sqlite3',
  models: [__dirname + '/models'] // or [Player, Team],
})

// Sequelize initialization and sync database.
sequelize
        .sync()
        .then(() =>
            // poblateDB()
            // tslint:disable-next-line:no-console
            console.log('database created!')
            )
        .catch(() => {
            throw new Error("Error initializing database.");
        });

// Get SERVER_PORT from NodeJS process runtime or set default 8000.
const port = process.env.SERVER_PORT || 8000;
const app = express();

// Route creations.
const router: Router = express.Router()

// Home is /.
router.get( "/", ( req, res, next ) => {
    res.send("Welcome! Bienvenido! Wilkommen! This is our API.") ;
});
router.use("/user", loginRouter);
router.use("/user", userRouter);
router.use("/client", userRouter);
router.use("/users", userRouter);

// Route prefix and version (updated 04-2021).
const apiPrefix: string = "api";
const apiVersion: string = "v1";
app.use(`/${apiPrefix}/${apiVersion}`, router);

app.get( "/", ( req, res ) => {
    res.send("This is our home page!") ;
});

// Run server!
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );