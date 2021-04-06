import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import Client from "./client";
import ClientProduct from "./client-product";

@Table({'timestamps': true})
class Product extends Model {
  /* ATTRIBUTES */
  @Column(DataType.TEXT)
  private name: string;
  @Column(DataType.TEXT)
  private price: number;

  @BelongsToMany(() => Client, () => ClientProduct)
  private clients: Client[];

  /* MODIFIERS */
  public getName(): string {
    return this.name;
  }
  public setName(value: string) {
    this.name = value;
  }
  public getPrice(): number {
    return this.price;
  }
  public setPrice(value: number) {
    this.price = value;
  }
  public getClients(): Client[]{
    return this.clients;
  }
  public setClients(value: Client[]){
    this.clients = value;
  }
}

export default Product;