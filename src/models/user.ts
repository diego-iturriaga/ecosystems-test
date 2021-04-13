import { AllowNull, BeforeCreate, BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Crypto from "../utils/crypto";
import Client from "./client";

@Table({'timestamps': true})
class User extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string
  @Column(DataType.TEXT)
  username: string;
  @AllowNull(false)
  @Column(DataType.TEXT)
  password: string;
  @Column(DataType.DATE)
  lastLogin: Date;

  @ForeignKey(() => Client)
  @Column(DataType.UUID)
  clientId: string;

  @BelongsTo(() => Client, {foreignKey: 'clientId', targetKey: 'id'})
  client: Client;

  @BeforeCreate
  static createHashPassword(instance: User){
    const cr: Crypto = new Crypto();
    instance.password = cr.hash(instance.password);
  }
}

export default User;