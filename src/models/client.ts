import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import Account from './account';
import ClientProduct from "./client-product";
import Product from './product';
import User from './user';

@Table({'timestamps': true})
class Client extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string;
  @Column(DataType.TEXT)
  private address1: string;
  @Column(DataType.TEXT)
  private address2: string;
  @Unique
  @Column(DataType.TEXT)
  private identification: string;

  @HasMany(() => Account, {as: 'accounts', foreignKey: 'clientId'})
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

  public getIdentification(): string {
    return this.identification;
  }
  public setIdentification(value: string) {
    this.identification = value;
  }
}

export default Client;