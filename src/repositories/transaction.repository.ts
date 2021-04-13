import { injectable } from 'inversify';
import Transaction from '../models/transaction';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface TransactionDocument {
  id: string;
  amount: number;
  detail: any;
  currency: string;
  transactionDetailId: string;
  accountId: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface ITransactionRepository extends IRepository<TransactionDocument> {
  getByIdIncludes(id: string, includes: any): Promise<TransactionDocument | null>;
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class TransactionRepository implements ITransactionRepository {
  public async getById(id: string): Promise<TransactionDocument | null> {
    const res = await Transaction.findOne({where: {id}});
    return res?res.get({plain:true}):null;
  }
  public async getByIdIncludes(id: string, includes: any): Promise<TransactionDocument | null> {
    const res = await Transaction.findByPk(id, {include: includes});
    return res?res.get({plain: true}):null;
  }
}
