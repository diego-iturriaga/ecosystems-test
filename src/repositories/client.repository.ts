import { injectable } from 'inversify';
import Client from '../models/client';
import { IRepository } from './repository';
import Account from '../models/account';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface ClientDocument {
  id: string;
  name: string;
  address1: string;
  address2: string;
  identification: string;
  accounts: [];
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IClientRepository extends IRepository<Client> {
  getByIdIncludes(id: string, includes: any): Promise<Client | null>;
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
  public async getById(id: string): Promise<Client | null> {
    const res = await Client.findOne({where: {id}});
    return res;
  }
  public async getByIdIncludes(id: string, includes: any): Promise<Client | null> {
    const res = await Client.findByPk(id, {include: includes});
    return res;
  }
}
