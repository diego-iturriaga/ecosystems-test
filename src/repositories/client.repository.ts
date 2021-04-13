import { injectable } from 'inversify';
import Product from '../models/product';
import Client from '../models/client';
import { IRepository } from './repository';

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
  accounts: any;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IClientRepository extends IRepository<ClientDocument> {
  addProduct(clientId: string, productId: string): Promise<boolean>;
  getByIdIncludes(id: string, includes: any): Promise<ClientDocument | null>;
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class ClientRepository implements IClientRepository {
  public async addProduct(clientId: string, productId: string): Promise<boolean> {
    var cl = await Client.findByPk(clientId);
    var pr = await Product.findByPk(productId);
    if(cl && pr){
      cl.products.push(pr);
      cl.save();
      return true;
    }
    return false;
  }
  public async getById(id: string): Promise<ClientDocument | null> {
    const res = await Client.findOne({where: {id}});
    return res?res.get({plain:true}):null;
  }
  public async getByIdIncludes(id: string, includes: any): Promise<ClientDocument | null> {
    const res = await Client.findByPk(id, {include: includes});
    return res?res.get({plain: true}):null;
  }
}
