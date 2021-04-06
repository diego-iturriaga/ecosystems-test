import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Client from "./client";
import Product from "./product";

@Table
class ClientProduct extends Model {
  @ForeignKey(() => Client)
  @Column
  clientId: number

  @ForeignKey(() => Product)
  @Column
  productId: number
}

export default ClientProduct;