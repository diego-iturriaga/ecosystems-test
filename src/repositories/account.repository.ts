import { injectable } from 'inversify';
import Transaction from '../models/transaction';
import Account from '../models/account';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface AccountDocument {
  id: string;
  name: string;
  type: string;
  clientId: string;
  deletedAt?: Date;
  createdAt?: Date;
  transactions?: string[];
}

/**
 * Repository interface.
 */
export interface IAccountRepository extends IRepository<Account> {
  getByIdIncludes(id: string, includes: any): Promise<Account | null>;
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class AccountRepository implements IAccountRepository {
  public async getById(id: string): Promise<Account | null> {
    const res = await Account.findByPk(id);
    return res;
  }

  public async getByIdIncludes(id: string, includes: any): Promise<Account | null> {
    const res = await Account.findByPk(id, {include: includes});
    return res;
  }
}
