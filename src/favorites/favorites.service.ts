import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private repositorioFavorites: Repository<Favorite>,
  ) {}

  async obtenerTodos(): Promise<Favorite[]> {
    return this.repositorioFavorites.find({ relations: ['usuario', 'producto'] });
  }

  async obtenerPorUsuario(usuarioId: number): Promise<Favorite[]> {
    return this.repositorioFavorites.find({
      where: { usuario: { id: usuarioId } as any },
      relations: ['producto'],
    });
  }

  async agregarFavorito(usuario: User, producto: Product): Promise<Favorite> {
    const favorito = this.repositorioFavorites.create({ usuario, producto });
    return this.repositorioFavorites.save(favorito);
  }

  async eliminarFavorito(usuarioId: number, productoId: number): Promise<void> {
    const favorito = await this.repositorioFavorites.findOne({
      where: {
        usuario: { id: usuarioId } as any,
        producto: { id: productoId } as any,
      },
      relations: ['usuario', 'producto'],
    });

    if (!favorito) throw new NotFoundException('Favorito no encontrado');

    await this.repositorioFavorites.remove(favorito);
  }
}


