import { inject, injectable } from "inversify";
import { IAccountRepository } from "../repositories/account.repository";
import { IClientRepository } from "../repositories/client.repository";
import { ITransactionDetailRepository } from "../repositories/transaction.detail.repository";
import { ITransactionRepository } from "../repositories/transaction.repository";
import { IUserRepository, UserDocument } from '../repositories/user.repository';
import { TYPES } from '../types';

/**
 * Interface for UserService
 */
export interface IUserService {
  getClient(userId: string): Promise<void>;
  getUser(userId: string): Promise<void>;
  addProductToClient(clientId: string, productId: string): Promise<void>;

  getAccount(accountId: string): Promise<UserDocument>;
  getTransactions(accountId: string): Promise<UserDocument>;
  getTransactionDetail(transactionId: string): Promise<UserDocument>;
  getUserAccountSumAverageTransactions(accountId: string): Promise<number>;
}

/**
 * The actual class that contains all the business logic related to users.
 * Controller sanitize/validate(basic) and sends data to this class methods.
 */
@injectable()
export default class UserService implements IUserService {
  @inject(TYPES.UserRepository) private userRepository: IUserRepository;
  @inject(TYPES.ClientRepository) private clientRepository: IClientRepository;
  @inject(TYPES.AccountRepository) private accountRepository: IAccountRepository;
  @inject(TYPES.TransactionDetailRepository) private transactionDetailRepository: ITransactionDetailRepository;
  @inject(TYPES.TransactionRepository) private transactionRepository: ITransactionRepository;

  public async getClient(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async addProductToClient(clientId: string, productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getAccount(accountId: string): Promise<UserDocument> {
    this.accountRepository.getById(accountId);
    throw new Error("Method not implemented.");
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
