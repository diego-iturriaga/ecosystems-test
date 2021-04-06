import { Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import Account from './account';
import TransactionDetail from './transaction-detail';

@Table({'timestamps': true})
class Transaction extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private amount: number;
  @HasOne(() => TransactionDetail)
  private detail: Transaction;
  @Column(DataType.TEXT)
  private currency: string;

  @ForeignKey(() => Account)
  @Column(DataType.NUMBER)
  private accountId: number;

  /* MODIFIERS */
  public getAmount(): number {
    return this.amount;
  }
  public setAmount(value: number) {
    this.amount = value;
  }
  public getDetail(): Transaction {
    return this.detail;
  }
  public setDetail(value: Transaction) {
    this.detail = value;
  }
  public getCurrency(): string {
    return this.currency;
  }
  public setCurrency(value: string) {
    this.currency = value;
  }
  public getAccountId(): number {
    return this.accountId;
  }
  public setAccountId(value: number) {
    this.accountId = value;
  }
}

export default Transaction;