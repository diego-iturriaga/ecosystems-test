import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Account from './account';
import Product from './product';
import User from './user';
import ClientProduct from "./client-product";

@Table({'timestamps': true})
class Client extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string;
  @Column(DataType.TEXT)
  private address1: string;
  @Column(DataType.TEXT)
  private address2: string;
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  private userId: number;
  @HasMany(() => Account)
  private accounts: Account[];

  @BelongsToMany(() => Product, () => ClientProduct)
  private products: Product[];

  /* MODIFIERS */
  public getName(): string {
    return this.name;
  }
  public setName(value: string) {
    this.name = value;
  }
  public getAddress1(): string {
    return this.address1;
  }
  public setAddress1(value: string) {
    this.address1 = value;
  }
  public getAddress2(): string {
    return this.address2;
  }
  public setAddress2(value: string) {
    this.address2 = value;
  }
  public getUserId(): number {
    return this.userId;
  }
  public setUserId(value: number) {
    this.userId = value;
  }
  public getAccounts(): Account[] {
    return this.accounts;
  }
  public setAccounts(value: Account[]) {
    this.accounts = value;
  }
  public getProducts(): Product[] {
    return this.products;
  }
  public setProducts(value: Product[]) {
    this.products = value;
  }
}

export default Client;