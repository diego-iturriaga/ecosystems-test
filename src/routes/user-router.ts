import express from "express";
import UserController from "../controllers/user-controller";
import IUserController from "../interfaces/interface-user-controller";
import User from "../models/user";

const router = express.Router();

// My implementations.
const userController: IUserController = new UserController();

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
router.get( "/:userId/account", ( req, res ) => {
    const userId = Number(req.params.userId);
    userController.getUserAccounts(userId)
    .then(accs=>{
        if (!accs)
            return res.status(400).json({msg: 'Resource not found.'});
        return res.status(200).json(accs);
    }).catch(err=>{
        return res.status(500).json('An error has occurred.');
    });
});

/*
3.Listado de las transacciones asociadas a una cuenta específica.
GET /api/v1/user/:accountId/account/:id/transaction/
*/
router.get( "/:userId/account/:accountId/transaction", ( req, res ) => {
    const userId = Number(req.params.userId);
    const accountId = Number(req.params.accountId);
    userController.getUserAccountTransactions(userId, accountId)
    .then(trs=>{
        if (!trs)
            return res.status(400).json({msg: 'Resource not found.'});
        return res.status(200).json(trs);
    }).catch(err=>{
        res.status(500).json('An error has occurred.');
    });
});


/*
4.Detalle de la transacción
GET /api/v1/user/:id/account/:id/transaction/:id/detail/
*/
router.get( "/:userId/account/:accountId/transaction/:transactionId/detail", (req, res ) => {
    const userId = Number(req.params.userId);
    const accountId = Number(req.params.accountId);
    const transactionId = Number(req.params.transactionId);
    userController.getUserAccountTransactionDetail(userId, accountId, transactionId)
    .then(td=>{
        if (!td)
            return res.status(400).json({msg: 'Resource not found.'});
        return res.status(200).json(td);
    }).catch(err=>{
        return res.status(500).json('An error has occurred.');
    });
});

/*
5.Promedio del monto de las transacciones de una cuenta, dado un rango de tiempo.
GET /api/v1/user/:id/account/:id/sum-average-transaction/
*/
router.get( "/:userId/account/:accountId/sum-average-transaction/:startdate/:enddate", ( req, res ) => {
    const userId = Number(req.params.userId);
    const accountId = Number(req.params.accountId);
    const startDate = req.params.startdate;
    const endDate = req.params.enddate;
    userController.getUserAccountSumAverageTransactions(userId, accountId, startDate, endDate)
    .then(td=>{
        if (!td)
            return res.status(400).json({msg: 'Resource not found.'});
        return res.status(200).json({result: td});
    }).catch(err=>{
        return res.status(500).json('An error has occurred.');
    });
});

/*
6. Solicitud de nuevos productos (crédito ágil, tarjeta de crédito, cuenta de ahorros, leasing de vivienda).
PATCH /api/v1/user/:id/product/
Payload: {"op": "add", "path": "products", "value": :id }
*/
router.patch("/:userId/product/:productId/addproduct", async ( req, res ) => {
    const userId = Number(req.params.userId);
    const productId = Number(req.params.productId);
    await userController.addNewProductToUser(userId, productId).then(r=>{
        if(r)
            return res.status(200).json(r);
    }).catch(err=>{
        return res.status(500).json(err);
    });
});


export default router;