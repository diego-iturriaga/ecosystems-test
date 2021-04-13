import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Client from "./client";
import Product from "./product";

@Table
class ClientProduct extends Model {
  @ForeignKey(() => Client)
  @Column(DataType.UUID)
  clientId: string

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: string
}

export default ClientProduct;