import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey, PrimaryKey } from 'sequelize-typescript'
import Transaction from './transaction';
import User from './user';
import Client from './client';

@Table({'timestamps': true})
class Account extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _type: string;
  @ForeignKey(() => Client)
  @Column(DataType.NUMBER)
  private _clientId: number;
  @HasMany(() => Transaction)
  private _transactions: Transaction[];

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
  public get clientId(): number {
    return this._clientId;
  }
  public set clientId(value: number) {
    this._clientId = value;
  }
  public get transactions(): Transaction[] {
    return this._transactions;
  }
  public set transactions(value: Transaction[]) {
    this._transactions = value;
  }
}

export default Account;