import { Router } from "express";
import UserController from "../controllers/user.controller";
import container from "../inversify";
import asyncWrap from "../utils/asyncwrap";

export default class UserRoutes {
    public router: Router;
    public routerSecure: Router;
    public UserControllerInstance = container.get<UserController>(UserController);
    
    constructor() {
        this.router = Router();
        this.routerSecure = Router();
        this.routes();
    }

    routes(){
        this.router.post('/login', 
            asyncWrap(this.UserControllerInstance.login.bind(this.UserControllerInstance)
        ));

        /*
        2.Listado de mis cuentas bancarias.
        GET /api/v1/user/:id/account/
        */
        this.routerSecure.get('/user/:userId/account', 
            asyncWrap(this.UserControllerInstance.getUserAccounts.bind(this.UserControllerInstance)));

        /*
        3.Listado de las transacciones asociadas a una cuenta específica.
        GET /api/v1/user/:accountId/account/:id/transaction/
        */
        this.routerSecure.get('/user/:userId/account/:accountId/transaction',  
            asyncWrap(this.UserControllerInstance.getUserAccountTransactions.bind(this.UserControllerInstance)));


        /*
        4.Detalle de la transacción
        GET /api/v1/user/:id/account/:id/transaction/:id/detail/
        */
        this.routerSecure.get('/user/:userId/account/:accountId/transaction/:transactionId/detail',
                asyncWrap(this.UserControllerInstance.getUserAccountTransactionDetail.bind(this.UserControllerInstance)));

        /*
        5.Promedio del monto de las transacciones de una cuenta, dado un rango de tiempo.
        GET /api/v1/user/:id/account/:id/sum-average-transaction/
        */
        this.routerSecure.get('/user/:userId/account/:accountId/sum-average-transaction/:startdate/:enddate', 
                asyncWrap(this.UserControllerInstance.getUserAccountSumAverageTransactions.bind(this.UserControllerInstance)));

        /*
        6. Solicitud de nuevos productos (crédito ágil, tarjeta de crédito, cuenta de ahorros, leasing de vivienda).
        PATCH /api/v1/user/:id/product/
        Payload: {"op": "add", "path": "products", "value": :id }
        */
        this.routerSecure.patch('/user/:userId/product/:productId/addproduct', 
                asyncWrap(this.UserControllerInstance.addNewProductToUser.bind(this.UserControllerInstance)));
    }
}