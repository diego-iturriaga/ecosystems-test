import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize, ForeignKey } from 'sequelize-typescript'
import Transaction from './transaction';

@Table({'timestamps': true})
class TransactionDetail extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string
  @Column(DataType.TEXT)
  private username: string
  @Column(DataType.TEXT)
  private password: string
  @Column(DataType.DATE)
  private lastLogin: Date
  @ForeignKey(() => Transaction)
  @Column(DataType.NUMBER)
  private transactionId: number;

  /* ATTRIBUTES */
  public getName(): string {
    return this.name
  }
  public setName(value: string) {
    this.name = value
  }
  public getUsername(): string {
    return this.username
  }
  public setUsername(value: string) {
    this.username = value
  }
  public getPassword(): string {
    return this.password
  }
  public setPassword(value: string) {
    this.password = value
  }
  public getLastLogin(): Date {
    return this.lastLogin
  }
  public setLastLogin(value: Date) {
    this.lastLogin = value
  }
  public getTransactionId(): number {
    return this.transactionId;
  }
  public setTransactionId(value: number) {
    this.transactionId = value;
  }
}

export default TransactionDetail;