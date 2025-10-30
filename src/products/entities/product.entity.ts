import {Entity,PrimaryGeneratedColumn,Column,OneToMany,ManyToOne,} from 'typeorm';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { User } from '../../users/entities/user.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'idProduct' })
  idProduct: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'stock' })
  stock: number;

  @Column({ name: 'imagen', nullable: true })
  imagen: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.producto)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.productos)
  usuario: User;
 @OneToMany(() => Favorite, (favorite) => favorite.producto)
  favoritos: Favorite[];


}
