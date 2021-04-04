import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey } from 'sequelize-typescript'
import User from './user';

@Table({'timestamps': true})
class Product extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _price: number;

  /* MODIFIERS */
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
}

export default Product;