import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as createUserDto from './dto/create-user.dto';
import * as updateUserDto from './dto/update-user.dto';
import * as yup from 'yup';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: createUserDto.CreateUserDto) {
    try {
      const data = await createUserDto.createUserSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return this.usersService.create(data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Error',
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: updateUserDto.UpdateUserDto,
  ) {
    try {
      const data = await updateUserDto.updateUserSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return this.usersService.update(+id, data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Error',
          errors: error.errors,
        });
      }
      throw error;
    }
  }

  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<UpdateUserDto>,
  ) {
    return this.usersService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
