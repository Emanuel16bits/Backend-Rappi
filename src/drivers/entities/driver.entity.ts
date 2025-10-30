import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  vehiculo: string;

  @Column({ default: true })
  disponible: boolean; 

  @Column({ type: 'float', default: 0 })
  calificacion: number; 

  @Column({ type: 'float', default: 0 })
  gananciasTotales: number; 

  @OneToMany(() => Order, (pedido) => pedido.driver)
  pedidos: Order[];
}

