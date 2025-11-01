import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn({ name: 'idCartItem' })
  idCartItem: number;

  @Column({ name: 'idCart', type: 'int' })
  idCart: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCart' })
  carrito: Cart;

  @Column({ name: 'idProducto', type: 'int' })
  idProducto: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'idProducto' })
  producto: Product;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'precioUnitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @CreateDateColumn({ name: 'fechaCreacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fechaActualizacion' })
  fechaActualizacion: Date;
}
