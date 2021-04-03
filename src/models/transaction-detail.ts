import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize } from 'sequelize-typescript'


@Table({'timestamps': true})
class TransactionDetail extends Model {
  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  username: string

  @Column(DataType.TEXT)
  password: string

  @Column(DataType.DATE)
  lastLogin: Date

}

export default TransactionDetail;