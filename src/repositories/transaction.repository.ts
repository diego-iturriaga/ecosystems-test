import { injectable } from 'inversify';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface TransactionDocument {
  id: string;
  amount: number;
  detailId: string;
  currency: string;
  accountId: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface ITransactionRepository extends IRepository<TransactionDocument> {
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class TransactionRepository implements ITransactionRepository {
  constructor() {
  }
  public async getById(id: string): Promise<TransactionDocument | null> {
    throw new Error('Method not implemented.');
  }
}
