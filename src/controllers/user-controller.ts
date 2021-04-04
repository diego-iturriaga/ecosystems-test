import Account from '../models/account';
import IUserController from '../interfaces/interface-user-controller';
import Transaction from '../models/transaction';
import TransactionDetail from '../models/transaction-detail';

class UserController implements IUserController{
    getUserAccounts(clientId: number): Account[] {
        throw new Error('Method not implemented.');
    }
    getUserAccountTransactions(clientId: number, accountId: number): Transaction[] {
        throw new Error('Method not implemented.');
    }
    getUserAccountTransactionDetail(clientId: number, accountId: number, transactionId: number): TransactionDetail {
        throw new Error('Method not implemented.');
    }
    getUserAccountSumAverageTransactions(clientId: number, accountId: number, startDate: Date, endDate: Date): number {
        throw new Error('Method not implemented.');
    }
    addNewProductToUser(clientId: number, productId: number): [boolean, any] {
        throw new Error('Method not implemented.');
    }
}

export default UserController;