import Account from "../models/account";
import Transaction from "../models/transaction";
import TransactionDetail from "../models/transaction-detail";

interface IUserController{
    // point 2
    getUserAccounts(userId: number): Promise<void | Account[] | null>;
    // point 3
    getUserAccountTransactions(userId: number, accountId: number): Promise<void | Transaction[] | null>;
    // point 4
    getUserAccountTransactionDetail(userId: number, accountId: number, transactionId: number): Promise<void | TransactionDetail | null>;
    // point 5
    getUserAccountSumAverageTransactions(userId: number, accountId: number, startDate: string, endDate: string): Promise<void | number | null>;
    // point 6
    addNewProductToUser(userId: number, productId: number): Promise<void | boolean | null>;
}

export default IUserController;