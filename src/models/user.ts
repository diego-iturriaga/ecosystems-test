import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize } from 'sequelize-typescript'
import Client from "./client";


@Table({'timestamps': true})
class User extends Model {
  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  username: string

  @Column(DataType.TEXT)
  password: string

  @Column(DataType.DATE)
  lastLogin: Date

  @HasOne(() => Client)
  client: Client;
}

export default User;