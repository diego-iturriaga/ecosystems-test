import { injectable } from 'inversify';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface AccountDocument {
  _id: string;
  username: string;
  email: string;
  lastLoggedIn?: Date;
  password: string;
  role?: number;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IAccountRepository extends IRepository<AccountDocument> {
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
  getById(id: string): Promise<AccountDocument> {
    throw new Error('Method not implemented.');
  }
  save(t: AccountDocument): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
