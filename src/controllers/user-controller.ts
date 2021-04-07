import { Op } from 'sequelize';
import IUserController from '../interfaces/interface-user-controller';
import Account from '../models/account';
import Product from '../models/product';
import Transaction from '../models/transaction';
import TransactionDetail from '../models/transaction-detail';
import User from '../models/user';
import Client from "../models/client";
import ClientProduct from '../models/client-product';


class UserController implements IUserController{
    async getUserAccounts(userId: number): Promise<void | Account[] | null> {
        return User.findOne({where: {id: userId}, include: [Client]}).then(usr => {
            return Account.findAll({where: {clientId: usr?.getClientId()}}).then(accs=>{
                return accs;
            });
        });
    }

    async getUserAccountTransactions(userId: number, accountId: number): Promise<void | Transaction[] | null> {
        return Transaction.findAll({where: {accountId}}).then(trlist => {
            return trlist;
        });
    }
    async getUserAccountTransactionDetail(userId: number, accountId: number, transactionId: number): Promise<void | TransactionDetail | null> {
        return Transaction.findByPk(transactionId, {include: TransactionDetail}).then(trd => {
            return trd?.getDetail();
        });
        //return TransactionDetail.findOne({where: {transactionId}}).then(trd => {
        //    return trd;
        //});
    }
    async getUserAccountSumAverageTransactions(userId: number, accountId: number, startDate: string, endDate: string): Promise<number | void | null> {
        return Transaction.findAll(
            {where:
                {accountId,
                createdAt: {[Op.between]: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]}}})
            .then(trlist=>{
                let sum = 0;
                let count = 0;
                trlist.forEach((resultSetItem) => {
                    count++;
                    sum+= Number(resultSetItem.getAmount());
                });
                if(count===0) return 0;
                return sum/count;
            });
    }
    async addNewProductToUser(userId: number, productId: number): Promise<void | boolean | ClientProduct> {
        return User.findByPk(userId).then(usr=>{
            return Product.findByPk(productId).then(pr=>{
                return Client.findByPk(usr?.getClientId(), {include: Product}).then(cl=>{
                    return ClientProduct.create({clientId: cl?.id, productId: pr?.id}).then(cp=>{
                        return cp;
                    }).catch(err=>{
                        return err;
                    });
                });
            });
        });
    }
}

export default UserController;