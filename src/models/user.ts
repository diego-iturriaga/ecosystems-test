import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize, NotNull, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import Client from "./client";
import ICrypto from "../interfaces/inteface-crypto";
import Crypto from "../utils/crypto";

@Table({'timestamps': true})
class User extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string;
  @Column(DataType.TEXT)
  private username: string;
  @AllowNull(false)
  @Column(DataType.TEXT)
  private password: string;
  @Column(DataType.DATE)
  private lastLogin: Date;
  @HasOne(() => Client)
  private client: Client;

  /* MODIFIERS */
  public getName(): string {
    return this.name;
  }
  public setName(value: string) {
    this.name = value;
  }
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