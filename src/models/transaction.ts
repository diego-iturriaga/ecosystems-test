import { BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Account from './account';
import TransactionDetail from './transaction.detail';

@Table({'timestamps': true})
class Transaction extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string
  @Column(DataType.TEXT)
  amount: number;

  @ForeignKey(() => TransactionDetail)
  @Column(DataType.NUMBER)
  detailId: string;
  
  @BelongsTo(() => TransactionDetail, {foreignKey: 'detailId', targetKey: 'id'})
  detail: TransactionDetail;

  @Column(DataType.TEXT)
  currency: string;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId: string;

}

export default Transaction;