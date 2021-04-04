import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey } from 'sequelize-typescript'
import User from './user';
import Product from './product';
import Account from './account';

@Table({'timestamps': true})
class Client extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _address1: string;
  @Column(DataType.TEXT)
  private _address2: string;
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  private _userId: number;
  @HasMany(() => Account)
  private _accounts: Account[];
  @HasMany(() => Product)
  private _products: Product[];
  
  /* MODIFIERS */
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get address1(): string {
    return this._address1;
  }
  public set address1(value: string) {
    this._address1 = value;
  }
  public get address2(): string {
    return this._address2;
  }
  public set address2(value: string) {
    this._address2 = value;
  }
  public get userId(): number {
    return this._userId;
  }
  public set userId(value: number) {
    this._userId = value;
  }
  public get accounts(): Account[] {
    return this._accounts;
  }
  public set accounts(value: Account[]) {
    this._accounts = value;
  }
  public get products(): Product[] {
    return this._products;
  }
  public set products(value: Product[]) {
    this._products = value;
  }

  /* OTHER FUNCTIONS */
  addProduct(pr: Product): boolean{
    return false;
  }
  getMyAccounts(): Account[]{
    return new Array;
  }
}

export default Client;