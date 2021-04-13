import { injectable } from 'inversify';
import Client from '../models/client';
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface ClientDocument {
  id: string;
  name?: string;
  address1?: string;
  address2?: string;
  identification: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IClientRepository extends IRepository<ClientDocument> {
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class ClientRepository implements IClientRepository {
  constructor() {
  }
  public async getById(id: string): Promise<ClientDocument | null> {
    const res = await Client.findByPk(id, {raw: true}).then(res=>{
      return res;
    });
    return res;
  }
}
