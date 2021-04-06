import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey, PrimaryKey } from 'sequelize-typescript'
import Transaction from './transaction';
import User from './user';
import Client from './client';

@Table({'timestamps': true})
class Account extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string;
  @Column(DataType.TEXT)
  private type: string;
  @ForeignKey(() => Client)
  @Column(DataType.NUMBER)
  private clientId: number;
  @HasMany(() => Transaction)
  private transactions: Transaction[];

  /* MODIFIERS */
  public getName(): string {
    return this.name;
  }
  public setName(value: string) {
    this.name = value;
  }
  public getType(): string {
    return this.type;
  }
  public setType(value: string) {
    this.type = value;
  }
  public getClientId(): number {
    return this.clientId;
  }
  public setClientId(value: number) {
    this.clientId = value;
  }
  public getTransactions(): Transaction[] {
    return this.transactions;
  }
  public setTransactions(value: Transaction[]) {
    this.transactions = value;
  }
}

export default Account;