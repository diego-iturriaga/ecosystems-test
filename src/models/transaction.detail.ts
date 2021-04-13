import { Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({'timestamps': true})
class TransactionDetail extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string
  @Column(DataType.TEXT)
  description: string
}

export default TransactionDetail;