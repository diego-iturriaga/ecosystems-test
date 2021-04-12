import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Client from "./client";
import Product from "./product";

@Table
class ClientProduct extends Model {
  @ForeignKey(() => Client)
  @Column(DataType.NUMBER)
  clientId: number

  @ForeignKey(() => Product)
  @Column(DataType.NUMBER)
  productId: number
}

export default ClientProduct;