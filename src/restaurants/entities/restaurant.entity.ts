import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,OneToMany,} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'idRestaurante' })
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 50 })
  categoria: string;

  @Column({ length: 5 })
  horarioApertura: string;

  @Column({ length: 5 })
  horarioCierre: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => User, (user) => user.restaurantes)
  @JoinColumn({ name: 'idUsuario' })
  usuario: User;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
