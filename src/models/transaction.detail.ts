import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Transaction from './transaction';

@Table({'timestamps': true})
class TransactionDetail extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private description: string
  @ForeignKey(() => Transaction)

  /* ATTRIBUTES */
  public getDescription(): string {
    return this.description
  }
  public setDescription(value: string) {
    this.description = value
  }
}

export default TransactionDetail;