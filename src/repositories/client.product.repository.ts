import { injectable } from 'inversify';
import ClientProduct from '../models/client.product';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface ClientProductDocument {
  clientId: string;
  productId: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IClientProductRepository {
    addProductToClient(clientId: string, productId: string): Promise<boolean>;
}

@injectable()
export default class ClientProductRepository implements IClientProductRepository {
  public async addProductToClient(clientId: string, productId: string): Promise<boolean> {
    try{
      const res = await ClientProduct.create({clientId, productId});
      return res != null;
    } catch (error) {
      //log & error
      return false;
    }
  }
}
