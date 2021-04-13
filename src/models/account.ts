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

  public getAverage(): number{
    let counter = 0;
    var summatory: number = 0;
    for(const element of this.transactions){
      counter++;
      summatory = Number(summatory) + Number(element.amount);
    }
    return counter>0? summatory/counter : 0;
  }
}

export default Account;
