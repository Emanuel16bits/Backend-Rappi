import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({ relations: ['cart'] });
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { idCartItem: id },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new NotFoundException(`Ítem de carrito con ID ${id} no encontrado`);
    }

    return cartItem;
  }

  async update(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.findOne(id);

    // Actualizar solo los campos que vienen en el DTO
    Object.assign(cartItem, updateCartItemDto);

    return this.cartItemRepository.save(cartItem);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cartItemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Ítem de carrito con ID ${id} no encontrado`);
    }
  }
}
