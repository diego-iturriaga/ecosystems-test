import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize } from 'sequelize-typescript'
import TransactionDetail from './transaction-detail';


@Table({'timestamps': true})
class Transaction extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _amount: number;
  @HasOne(() => TransactionDetail)
  private _detail: Transaction;
  @Column(DataType.TEXT)
  private _currency: string;

  /* MODIFIERS */
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }
  public get detail(): Transaction {
    return this._detail;
  }
  public set detail(value: Transaction) {
    this._detail = value;
  }
  public get currency(): string {
    return this._currency;
  }
  public set currency(value: string) {
    this._currency = value;
  }
}

export default Transaction;