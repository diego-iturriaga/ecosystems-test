import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey } from 'sequelize-typescript'
import User from './user';

@Table({'timestamps': true})
class Client extends Model {
  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  address: string

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId: number
}

export default Client;