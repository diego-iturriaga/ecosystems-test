import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Client from './client';
import Transaction from './transaction';

@Table({ 'timestamps': true })
class Account extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string
  @Column(DataType.TEXT)
  name: string;
  @Column(DataType.TEXT)
  type: string;

  @ForeignKey(() => Client)
  @Column(DataType.UUID)
  clientId: string;

  @BelongsTo(() => Client, { foreignKey: 'clientId', targetKey: 'id' })
  client: Client;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}

export default Account;
