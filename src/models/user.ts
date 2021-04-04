import { Table, Column, Model, HasMany, HasOne, DataType, CreatedAt, Sequelize } from 'sequelize-typescript'
import Client from "./client";


@Table({'timestamps': true})
class User extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private _name: string;
  @Column(DataType.TEXT)
  private _username: string;
  @Column(DataType.TEXT)
  private _password: string;
  @Column(DataType.DATE)
  private _lastLogin: Date;
  @HasOne(() => Client)
  private _client: Client;

  /* MODIFIERS */
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get lastLogin(): Date {
    return this._lastLogin;
  }
  public set lastLogin(value: Date) {
    this._lastLogin = value;
  }
  public get client(): Client {
    return this._client;
  }
  public set client(value: Client) {
    this._client = value;
  }
}

export default User;