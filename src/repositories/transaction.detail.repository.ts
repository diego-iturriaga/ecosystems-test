import { injectable } from 'inversify';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface TransactionDetailDocument {
  id: string;
  description: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface ITransactionDetailRepository extends IRepository<TransactionDetailDocument> {
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
  public async getById(id: string): Promise<TransactionDetailDocument | null> {
    throw new Error('Method not implemented.');
  }
}
