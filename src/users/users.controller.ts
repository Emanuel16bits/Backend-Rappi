import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RestaurantsService } from '../restaurants/restaurants.service';

// Enum para los roles
type UserRole = 'cliente' | 'vendedor' | 'repartidor';

// DTOs para tipar correctamente
interface CreateUserDto {
  nombre: string;
  email: string;
  password: string;
  rol: UserRole; // ✅ Ahora usa el tipo específico
  restaurante?: {
    nombre: string;
    direccion: string;
    categoria: string;
    descripcion?: string; // ✅ Agregado
    activo?: boolean;
    horarioApertura?: string;
    horarioCierre?: string;
  };
}

interface CreateRestaurantDto {
  nombre: string;
  direccion: string;
  categoria: string;
  descripcion: string; // ✅ Agregado como obligatorio
  idUsuario: number;
  activo: boolean;
  horarioApertura: string;
  horarioCierre: string;
}

// ✅ DTO específico para updates
interface UpdateUserDto {
  nombre?: string;
  email?: string;
  password?: string;
  rol?: UserRole; // ✅ Tipo específico en lugar de string
}

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private restaurantsService: RestaurantsService,
  ) {}

  // Obtener todos los usuarios
  @Get()
  async getAll() {
    try {
      const users = await this.usersService.findAll();
      return { success: true, data: users };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener los usuarios',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Obtener usuario por ID
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Crear usuario (con o sin restaurante)
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      console.log('📥 Body recibido:', JSON.stringify(body, null, 2));

      // Validaciones básicas
      if (!body.nombre || !body.email || !body.password || !body.rol) {
        return {
          success: false,
          message: 'Faltan campos obligatorios: nombre, email, password, rol',
        };
      }

      // Validar que el rol sea válido
      const rolesValidos: UserRole[] = ['cliente', 'vendedor', 'repartidor'];
      if (!rolesValidos.includes(body.rol)) {
        return {
          success: false,
          message: 'Rol inválido. Debe ser: cliente, vendedor o repartidor',
        };
      }

      // 1. Crear usuario
      const user = await this.usersService.create({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        rol: body.rol,
      });

      console.log('✅ Usuario creado con ID:', user.id);

      // 2. Si es vendedor y tiene datos de restaurante
      if (body.rol === 'vendedor' && body.restaurante) {
        const restauranteData = body.restaurante;

        console.log('🏪 Datos del restaurante recibidos:', restauranteData);

        // Validar campos obligatorios del restaurante
        if (
          !restauranteData.nombre ||
          !restauranteData.direccion ||
          !restauranteData.categoria
        ) {
          return {
            success: false,
            message:
              'Faltan datos del restaurante: nombre, direccion o categoria',
          };
        }

        // Construir objeto del restaurante con tipado correcto
        const restaurantToCreate: CreateRestaurantDto = {
          nombre: restauranteData.nombre,
          direccion: restauranteData.direccion,
          categoria: restauranteData.categoria,
          descripcion: restauranteData.descripcion ?? '', // ✅ Agregado con valor por defecto
          idUsuario: user.id,
          activo: restauranteData.activo ?? true,
          horarioApertura: restauranteData.horarioApertura ?? '08:00',
          horarioCierre: restauranteData.horarioCierre ?? '22:00',
        };

        console.log(
          '🏪 Datos finales para crear restaurante:',
          restaurantToCreate,
        );

        const restaurant =
          await this.restaurantsService.create(restaurantToCreate);

        console.log('✅ Restaurante creado con ID:', restaurant.id);

        return {
          success: true,
          message: 'Usuario y restaurante creados correctamente',
          data: {
            userId: user.id,
            restaurantId: restaurant.id,
            user: user,
            restaurant: restaurant,
          },
        };
      }

      // Si no es vendedor o no tiene datos de restaurante
      return {
        success: true,
        message: 'Usuario creado correctamente',
        data: {
          userId: user.id,
          user: user,
        },
      };
    } catch (error) {
      console.error('❌ Error al crear usuario:', error);
      return {
        success: false,
        message: 'Error al crear el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Actualizar usuario (PUT)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // ✅ Usa UpdateUserDto
    try {
      const updated = await this.usersService.update(+id, body);
      return {
        success: true,
        message: 'Usuario actualizado',
        data: updated,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al actualizar el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Actualización parcial (PATCH)
  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // ✅ Usa UpdateUserDto
    try {
      const updated = await this.usersService.update(+id, body);
      return {
        success: true,
        message: 'Usuario actualizado parcialmente',
        data: updated,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al actualizar el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Eliminar usuario
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return {
        success: true,
        message: 'Usuario eliminado correctamente',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al eliminar el usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }
}
