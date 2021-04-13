import { injectable } from 'inversify';
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
}

/**
 * Repository interface.
 */
export interface IAccountRepository extends IRepository<AccountDocument> {
  getAccountsByClientId(clientId: string): Promise<AccountDocument[] | void>
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class AccountRepository implements IAccountRepository {
  constructor() {
  }
  public async getAccountsByClientId(clientId: string): Promise<AccountDocument[]> {
    const res = await Account.findAll({where: {clientId: clientId}, raw: true});
    return res? res : [];
  }
  public async getById(id: string): Promise<AccountDocument | null> {
    const res = await Account.findByPk(id, {raw: true});
    return res?.get({plain: true});
  }
}
