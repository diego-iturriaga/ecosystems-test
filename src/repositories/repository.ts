import { injectable, unmanaged } from 'inversify';
import { Model } from 'sequelize-typescript';

/**
 * Base repository interface.
 */
export interface IRepository<T> {
  getById(id: string): Promise<T>;
  save(t: T): Promise<any>;
}

/**
 * This Repository class is the base repository. It is an abstract class because it can only be
 * extended. This class is writen to support mongoose properly which means it will look different
 * if you use mongodb driver directly or use any other orm or database driver.
 *
 * The collection property is the mongoose collection in this case. For you, it can be mongodb collection for example.
 */
@injectable()
export default class Repository<T> implements IRepository<T> {

  private readonly model: Model;

  constructor(@unmanaged() model: Model<any, any>) {
    this.model = model;
  }
  public async getById(id: string): Promise<T> {
    return this.model.get();
  }
  save(t: T): Promise<any> {
    throw new Error('Method not implemented.');
  }

}
