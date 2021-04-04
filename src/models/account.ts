import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey } from 'sequelize-typescript'
import Transaction from './transaction';
import User from './user';

@Table({'timestamps': true})
class Account extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _type: string;

  /* MODIFIERS */
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }
  getTransactions(): Transaction[]{
    return new Array;
  }
}

export default Account;