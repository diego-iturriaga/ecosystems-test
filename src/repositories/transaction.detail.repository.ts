import { injectable } from 'inversify';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface UserDocument {
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
export interface ITransactionDetailRepository extends IRepository<UserDocument> {
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class TransactionDetailRepository implements ITransactionDetailRepository {
  constructor() {
  }
  getById(id: string): Promise<UserDocument> {
    throw new Error('Method not implemented.');
  }
  save(t: UserDocument): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
