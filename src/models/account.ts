import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Client from './client';
import Transaction from './transaction';

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

  @BelongsTo(() => Client, {foreignKey: 'clientId', targetKey: 'id'})
  private client: Client;

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
  public getClient(): Client {
    return this.client;
  }
  public setClient(value: Client) {
    this.client = value;
  }
  public getTransactions(): Transaction[] {
    return this.transactions;
  }
  public setTransactions(value: Transaction[]) {
    this.transactions = value;
  }
}

export default Account;