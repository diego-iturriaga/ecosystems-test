import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize, ForeignKey } from 'sequelize-typescript'
import Transaction from './transaction';

@Table({'timestamps': true})
class TransactionDetail extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string
  @Column(DataType.TEXT)
  private _username: string
  @Column(DataType.TEXT)
  private _password: string
  @Column(DataType.DATE)
  private _lastLogin: Date
  @ForeignKey(() => Transaction)
  @Column(DataType.NUMBER)
  private _transactionId: number;

  /* ATTRIBUTES */
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }
  public get username(): string {
    return this._username
  }
  public set username(value: string) {
    this._username = value
  }
  public get password(): string {
    return this._password
  }
  public set password(value: string) {
    this._password = value
  }
  public get lastLogin(): Date {
    return this._lastLogin
  }
  public set lastLogin(value: Date) {
    this._lastLogin = value
  }
  public get transactionId(): number {
    return this._transactionId;
  }
  public set transactionId(value: number) {
    this._transactionId = value;
  }
}

export default TransactionDetail;