import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Transaction from './transaction';

@Table({'timestamps': true})
class TransactionDetail extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private description: string
  @ForeignKey(() => Transaction)
  @Column(DataType.NUMBER)
  private transactionId: number;

  /* ATTRIBUTES */
  public getDescriptions(): string {
    return this.description
  }
  public setDescription(value: string) {
    this.description = value
  }
  public getTransactionId(): number {
    return this.transactionId;
  }
  public setTransactionId(value: number) {
    this.transactionId = value;
  }
}

export default TransactionDetail;