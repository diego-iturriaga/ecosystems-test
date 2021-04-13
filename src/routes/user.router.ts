import { Application } from "express";
import container from "../inversify";
import UserController from "../controllers/user.controller";
import asyncWrap from "../utils/asyncwrap";
import config from "../config/config";

export default function (app: Application) {
    const UserControllerInstance = container.get<UserController>(UserController);
    
    // Get payload and process with JWT.
    app.post(`/${config.apiPrefix}/${config.apiVersion}/login`, async (req, res ) => {
        asyncWrap(UserControllerInstance.login.bind(UserControllerInstance));
    });

    /*
    2.Listado de mis cuentas bancarias.
    GET /api/v1/user/:id/account/
    */
    app.get(`/${config.apiPrefix}/${config.apiVersion}/user/:userId/account`, 
        asyncWrap(UserControllerInstance.getUserAccounts.bind(UserControllerInstance)));

    /*
    3.Listado de las transacciones asociadas a una cuenta específica.
    GET /api/v1/user/:accountId/account/:id/transaction/
    */
    app.get(`/${config.apiPrefix}/${config.apiVersion}/user/:userId/account/:accountId/transaction`,  
        asyncWrap(UserControllerInstance.getUserAccountTransactions.bind(UserControllerInstance)));


    /*
    4.Detalle de la transacción
    GET /api/v1/user/:id/account/:id/transaction/:id/detail/
    */
    app.get(`/${config.apiPrefix}/${config.apiVersion}/user/:userId/account/:accountId/transaction/:transactionId/detail`,
            asyncWrap(UserControllerInstance.getUserAccountTransactionDetail.bind(UserControllerInstance)));

    /*
    5.Promedio del monto de las transacciones de una cuenta, dado un rango de tiempo.
    GET /api/v1/user/:id/account/:id/sum-average-transaction/
    */
    app.get(`/${config.apiPrefix}/${config.apiVersion}/user/:userId/account/:accountId/sum-average-transaction/:startdate/:enddate`, 
            asyncWrap(UserControllerInstance.getUserAccountSumAverageTransactions.bind(UserControllerInstance)));

    /*
    6. Solicitud de nuevos productos (crédito ágil, tarjeta de crédito, cuenta de ahorros, leasing de vivienda).
    PATCH /api/v1/user/:id/product/
    Payload: {"op": "add", "path": "products", "value": :id }
    */
    app.patch(`/${config.apiPrefix}/${config.apiVersion}/user/:userId/product/:productId/addproduct`, 
            asyncWrap(UserControllerInstance.addNewProductToUser.bind(UserControllerInstance)));

}