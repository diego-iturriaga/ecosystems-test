import express from "express";
import Router from "express";
import User from "../models/user";
import Account from "../models/account";
import IUserController from "../interfaces/interface-user-controller";
import UserController from "../controllers/user-controller";
import UserLoginController from "../controllers/user-login-controller";
import IUserLoginController from "../interfaces/interface-userlogin-controller";

const router = express.Router();

//My implementations.
const userController: IUserController = new UserController(); 
const userLoginController: IUserLoginController = new UserLoginController(); 

// Get all users.
router.get( "/", ( req, res ) => {
    User.findAll()
    .then(list => res.status(200).json(list))
    .catch(error => res.status(400).send(error))
});

/*
2.Listado de mis cuentas bancarias.
GET /api/v1/user/:id/account/
*/
router.get( "/:id/account", ( req, res ) => {
    let clientId = Number(req.params.id);
    let accounts: Account[] = userController.getUserAccounts(clientId);
    res.send(accounts);
});

/*
3.Listado de las transacciones asociadas a una cuenta específica.
GET /api/v1/user/:id/account/:id/transaction/
*/
router.get( "/:id/account/:id/transaction", ( req, res ) => {
    User.findAll()
    .then(list => res.status(200).json(list))
    .catch(error => res.status(400).send(error))
});


/*
4.Detalle de la transacción
GET /api/v1/user/:id/account/:id/transaction/:id/detail/
*/
router.get( "/:id/account/:id/transaction/:id/detail", ( req, res ) => {
    User.findAll()
    .then(list => res.status(200).json(list))
    .catch(error => res.status(400).send(error))
});

/*
5.Promedio del monto de las transacciones de una cuenta, dado un rango de tiempo.
GET /api/v1/user/:id/account/:id/sum-average-transaction/
*/
router.get( "/:id/account/:id/sum-average-transaction/:startdate/:enddate", ( req, res ) => {
    User.findAll()
    .then(list => res.status(200).json(list))
    .catch(error => res.status(400).send(error))
});

/*
6. Solicitud de nuevos productos (crédito ágil, tarjeta de crédito, cuenta de ahorros, leasing de vivienda).
PATCH /api/v1/user/:id/product/
Payload: {"op": "add", "path": "products", "value": :id }
*/
router.patch( "/:id/account/:id/product/:id", ( req, res ) => {
    User.findAll()
    .then(list => res.status(200).json(list))
    .catch(error => res.status(400).send(error))
});


export default router;