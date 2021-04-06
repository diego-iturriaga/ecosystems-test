import Account from '../models/account';
import IUserController from '../interfaces/interface-user-controller';
import Transaction from '../models/transaction';
import TransactionDetail from '../models/transaction-detail';
import Client from '../models/client';
import User from '../models/user';
import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import Product from '../models/product';


class UserController implements IUserController{
    getUserAccounts(userId: number): Promise<void | Account[] | null> {
        return User.findByPk(userId).then(usr => {
            if(usr && usr.getClient())
                return usr.getClient().getAccounts();
            return null;
        });
    }

    getUserAccountTransactions(userId: number, accountId: number): Promise<void | Transaction[] | null> {
        return Account.findByPk(accountId).then(acc => {
            return acc?.getTransactions();
        });
    }
    getUserAccountTransactionDetail(userId: number, accountId: number, transactionId: number): Promise<void | TransactionDetail | null> {
        return TransactionDetail.findOne({where: {transactionId}}).then(trd => {
            return trd;
        });
    }
    getUserAccountSumAverageTransactions(userId: number, accountId: number, startDate: string, endDate: string): Promise<number | void | null> {
        // '2020-02-02'
        return Transaction.findAll(
            {where:
                {accountId,
                createAt: {[Op.between]: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]}}})
            .then(trlist=>{
                let sum = 0;
                let count = 0;
                trlist.forEach((resultSetItem) => {
                    count++;
                    sum+=resultSetItem.getAmount();
                });
                if(count===0) return 0;
                return sum/count;
            });
    }
    addNewProductToUser(userId: number, productId: number): Promise<boolean | void | null> {
        return User.findByPk(userId).then(usr=>{
            Product.findByPk(productId).then(pr=>{
                usr?.getClient().getProducts().push(pr!);
                usr?.save();
                return true;
            });
        });
    }
}

export default UserController;