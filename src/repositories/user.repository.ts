import { injectable, unmanaged } from 'inversify';
import User from "../models/user";
import { IRepository } from './repository';

/**
 * The schema definition. In other word,
 * A Document of the user collection contains following fields.
 */
export interface UserDocument {
  id: string;
  username: string;
  password: string;
  lastLogin?: Date;
  client_id: number;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IUserRepository extends IRepository<UserDocument> {
  //isUsernameExists(username: string): Promise<boolean>;
  //isEmailExists(username: string): Promise<boolean>;
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class UserRepository implements IUserRepository {
  private models: any;

  constructor (@unmanaged() models: any) {
    this.models = models;
  }

  public async getById(id: string): Promise<any> {
    const res = await User.findByPk(id, {raw: true}).then(res=>{
      return res;
    });
    return res;
  }
  public async save(t: UserDocument): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async isUsernameExists(username: string): Promise<boolean> {
    return false;
  }

  public async isEmailExists(email: string): Promise<boolean> {
    return false;
  }
}
