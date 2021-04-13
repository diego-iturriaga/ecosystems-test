import { BelongsToMany, Column, DataType, HasMany, IsUUID, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Account from './account';
import ClientProduct from "./client.product";
import Product from './product';

@Table({'timestamps': true})
class Client extends Model {
  /* ATTRIBUTES */
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;
  @Column(DataType.TEXT)
  name: string;
  @Column(DataType.TEXT)
  address1: string;
  @Column(DataType.TEXT)
  address2: string;
  @Unique
  @Column(DataType.TEXT)
  identification: string;

  @HasMany(() => Account, {as: 'accounts', foreignKey: 'clientId'})
  accounts: Account[];

  @BelongsToMany(() => Product, () => ClientProduct)
  products: Product[];

  
}

export default Client;