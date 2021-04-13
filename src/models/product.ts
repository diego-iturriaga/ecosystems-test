import { BelongsToMany, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Client from "./client";
import ClientProduct from "./client.product";

@Table({'timestamps': true})
class Product extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;
  @Column(DataType.TEXT)
  name: string;
  @Column(DataType.TEXT)
  price: number;

  @BelongsToMany(() => Client, () => ClientProduct)
  clients: Client[];

}

export default Product;