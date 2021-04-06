import { AllowNull, BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import ICrypto from "../interfaces/inteface-crypto";
import Crypto from "../utils/crypto";
import Client from "./client";

@Table({'timestamps': true})
class User extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private username: string;
  @AllowNull(false)
  @Column(DataType.TEXT)
  private password: string;
  @Column(DataType.DATE)
  private lastLogin: Date;

  @ForeignKey(() => Client)
  @Column(DataType.NUMBER)
  private clientId: number;

  @BelongsTo(() => Client, {foreignKey: 'clientId', targetKey: 'id'})
  private client: Client;

  /* MODIFIERS */
  public getUsername(): string {
    return this.username;
  }
  public setUsername(value: string) {
    this.username = value;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(value: string) {
    this.password = value;
  }
  public getLastLogin(): Date {
    return this.lastLogin;
  }
  public setLastLogin(value: Date) {
    this.lastLogin = value;
  }
  public getClient(): Client {
    return this.client;
  }
  public setClient(value: Client) {
    this.client = value;
  }
  public getClientId(): number {
    return this.clientId;
  }
  public setClientId(value: number) {
    this.clientId = value;
  }
  validatePassword(password: string): boolean{
    const cr: ICrypto = new Crypto();
    return cr.validPassword(password, this.getPassword());
  }

  @BeforeUpdate
  @BeforeCreate
  static createHashPassword(instance: User){
    const cr: ICrypto = new Crypto();
    instance.setPassword(cr.hash(instance.getPassword()));
  }
}

export default User;