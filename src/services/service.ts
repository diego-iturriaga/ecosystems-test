import { inject, injectable } from "inversify";
import Account from "../models/account";
import Client from "../models/client";
import Transaction from "../models/transaction";
import { AccountDocument, IAccountRepository } from "../repositories/account.repository";
import { ClientDocument, IClientRepository } from "../repositories/client.repository";
import { ITransactionDetailRepository, TransactionDetailDocument } from "../repositories/transaction.detail.repository";
import { ITransactionRepository, TransactionDocument } from "../repositories/transaction.repository";
import { IUserRepository, UserDocument } from '../repositories/user.repository';
import { TYPES } from '../types';

/**
 * Interface for UserService
 */
export interface IRepoService {
  addProductToClient(clientId: string, productId: string): Promise<void>;
  getAccounts(userId: string): Promise<AccountDocument[] | null>;
  getTransactions(accountId: string): Promise<TransactionDocument[] | null>;
  getTransactionDetail(transactionId: string): Promise<TransactionDetailDocument | null>;
  getUserAccountSumAverageTransactions(accountId: string): Promise<number>;
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

  public async getAccounts(userId: string): Promise<AccountDocument[] | null> {
    const resUser = await this.userRepository.getById(userId);
    if(!resUser){
      return null;
    }
    const resClient = await this.clientRepository.getByIdIncludes(resUser.clientId, [Account]);
    if(!resClient)
      return null;
    const res: AccountDocument[] = []
    for (const element of resClient.accounts){
      const resAccount = await this.accountRepository.getById(element.id);
      if(resAccount)
        res.push(resAccount.get({plain: true}));
    }
  return res;
  }
  public async getTransactions(accountId: string): Promise<TransactionDocument[] | null> {
    const resAccount = await this.accountRepository.getById(accountId);
    if (!resAccount || !resAccount.transactions)
      return null;
    let res: TransactionDocument[] = [];
    for(const element of resAccount.transactions){
      const tr = await this.transactionRepository.getById(element.id);
      if (tr)
        res.push(tr.get({plain: true}));
    }
    
    return res;
  }
  public async getTransactionDetail(transactionId: string): Promise<TransactionDetailDocument | null> {
    const resTrans = await this.transactionRepository.getById(transactionId);
    if(!resTrans)
      return null;
    const resDetail = await this.transactionDetailRepository.getById(resTrans.detailId);
    return resDetail? resDetail : null;
  }
  public async getUserAccountSumAverageTransactions(accountId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  public async addProductToClient(clientId: string, productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }  
}
