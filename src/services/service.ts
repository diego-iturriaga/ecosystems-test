import { inject, injectable } from "inversify";
import { AccountDocument, IAccountRepository } from "../repositories/account.repository";
import { ClientDocument, IClientRepository } from "../repositories/client.repository";
import { ITransactionDetailRepository } from "../repositories/transaction.detail.repository";
import { ITransactionRepository } from "../repositories/transaction.repository";
import { IUserRepository, UserDocument } from '../repositories/user.repository';
import { TYPES } from '../types';

/**
 * Interface for UserService
 */
export interface IRepoService {
  getClient(userId: string): Promise<ClientDocument | null>;
  addProductToClient(clientId: string, productId: string): Promise<void>;
  getAccounts(userId: string): Promise<AccountDocument | AccountDocument[] | null>;
  getTransactions(accountId: string): Promise<UserDocument | null>;
  getTransactionDetail(transactionId: string): Promise<UserDocument | null>;
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

  public async getClient(userId: string): Promise<ClientDocument | null> {
    const resUser = await this.userRepository.getById(userId);
    if(!resUser){
      return null;
    }
    const resClient = await this.clientRepository.getById(resUser.clientId);
    return resClient;
  }
  public async addProductToClient(clientId: string, productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getAccounts(userId: string): Promise<AccountDocument | AccountDocument[] | null> {
    const resUser = await this.userRepository.getById(userId);
    if(!resUser)
      return null;
    const resClient = await this.clientRepository.getById(resUser.clientId);
    if(!resClient)
      return null;
    const resAccounts = await this.accountRepository.getAccountsByClientId(resClient.id);
    return resAccounts? resAccounts : null;
  }
  public async getTransactions(accountId: string): Promise<UserDocument> {
    throw new Error("Method not implemented.");
  }
  public async getTransactionDetail(transactionId: string): Promise<UserDocument> {
    throw new Error("Method not implemented.");
  }
  public async getUserAccountSumAverageTransactions(accountId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }  
}
