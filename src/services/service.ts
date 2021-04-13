import { inject, injectable } from "inversify";
import { IClientProductRepository } from "../repositories/client.product.repository";
import Account from "../models/account";
import Transaction from "../models/transaction";
import TransactionDetail from "../models/transaction.detail";
import { AccountDocument, IAccountRepository } from "../repositories/account.repository";
import { IClientRepository } from "../repositories/client.repository";
import { ITransactionDetailRepository, TransactionDetailDocument } from "../repositories/transaction.detail.repository";
import { ITransactionRepository, TransactionDocument } from "../repositories/transaction.repository";
import { IUserRepository, UserDocument } from '../repositories/user.repository';
import { TYPES } from '../types';

/**
 * Interface for UserService
 */
export interface IRepoService {
  getUserByUsername(username: string): Promise<UserDocument | null>;
  addProductToClient(userId: string, productId: string): Promise<boolean>;
  getAccounts(userId: string): Promise<AccountDocument[] | null>;
  getTransactions(accountId: string): Promise<TransactionDocument[] | null>;
  getTransactionDetail(transactionId: string): Promise<TransactionDetailDocument | null>;
  getUserAccountSumAverageTransactions(accountId: string): Promise<number | null>;
}

/**
 * The actual class that contains all the business logic related to users.
 * Controller sanitize/validate(basic) and sends data to this class methods.
 */
@injectable()
export default class RepoService implements IRepoService {
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;
  @inject(TYPES.ClientRepository) private clientRepository: IClientRepository;
  @inject(TYPES.AccountRepository) private accountRepository: IAccountRepository;
  @inject(TYPES.TransactionDetailRepository) private transactionDetailRepository: ITransactionDetailRepository;
  @inject(TYPES.TransactionRepository) private transactionRepository: ITransactionRepository;
  @inject(TYPES.ClientProductRepository) private clientProductRepository: IClientProductRepository;

  public async getUserByUsername(username: string): Promise<UserDocument | null> {
    return this.userRepository.getUserByUsername(username);
  }

  public async getAccounts(userId: string): Promise<AccountDocument[] | null> {
    const resUser = await this.userRepository.getById(userId);
    if(!resUser){
      return null;
    }
    const resClient = await this.clientRepository.getByIdIncludes(resUser.clientId, [Account]);
    if(!resClient)
      return null;
    return resClient.accounts;
  }
  public async getTransactions(accountId: string): Promise<TransactionDocument[] | null> {
    const resAccount = await this.accountRepository.getByIdIncludes(accountId, [Transaction]);
    if (!resAccount)
      return null;
    return resAccount.transactions;
  }
  public async getTransactionDetail(transactionId: string): Promise<TransactionDetailDocument | null> {
    const resTrans = await this.transactionRepository.getByIdIncludes(transactionId, [TransactionDetail]);
    if(!resTrans)
      return null;
    return resTrans.detail;
  }
  public async getUserAccountSumAverageTransactions(accountId: string): Promise<number | null> {
    const res = await this.accountRepository.getAverage(accountId);
    return res;
  }
  public async addProductToClient(userId: string, productId: string): Promise<boolean> {
    const resUser = await this.userRepository.getById(userId);
    if(!resUser){
      return false;
    }
    if(resUser){
      const res = await this.clientProductRepository.addProductToClient(resUser.clientId, productId);
      return res;
    }
    return false;
  }  
}
