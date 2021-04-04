import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey } from 'sequelize-typescript'
import User from './user';

@Table({'timestamps': true})
class Product extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _address1: string;
  @Column(DataType.TEXT)
  private _address2: string;
  
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
}

export default Product;