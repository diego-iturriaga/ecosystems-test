import Client from "../models/client";
import Account from "../models/account";
import Transaction from "../models/transaction";
import TransactionDetail from "../models/transaction-detail";

interface IUserController{
    // point 2
    getUserAccounts(clientId: number): Account[];
    // point 3
    getUserAccountTransactions(clientId: number, accountId: number): Transaction[];
    // point 4
    getUserAccountTransactionDetail(clientId: number, accountId: number, transactionId: number): TransactionDetail;
    // point 5
    getUserAccountSumAverageTransactions(clientId: number, accountId: number, startDate: Date, endDate: Date): number;
    // point 6
    addNewProductToUser(clientId: number, productId: number): [boolean, any]; // [true and ""] OR [false and "error message"]
}

export default IUserController;