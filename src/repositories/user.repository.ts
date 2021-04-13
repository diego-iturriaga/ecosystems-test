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
  clientId: string;
  deletedAt?: Date;
  createdAt?: Date;
}

/**
 * Repository interface.
 */
export interface IUserRepository extends IRepository<UserDocument> {
  getUserByUsername(username: string): Promise<UserDocument | null>;
}

/**
 * User repository. In the constructor we pass the collection name to the
 * parent constructor.
 *
 */
@injectable()
export default class UserRepository implements IUserRepository {
  getUserByUsername(username: string): Promise<UserDocument | null> {
    const user = User.findOne({where: {username: username}});
    return user;
  }
  public async getById(id: string): Promise<UserDocument | null> {
    const res = await User.findByPk(id, {raw: true}).then(res=>{
      return res;
    });
    return res;
  }
}
