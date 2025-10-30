import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  obtenerTodos(): Promise<Driver[]> {
    return this.driversService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: number): Promise<Driver> {
    return this.driversService.obtenerUno(id);
  }

  @Post()
  crear(@Body() driverData: Partial<Driver>): Promise<Driver> {
    return this.driversService.crear(driverData);
  }

  @Patch(':id/disponibilidad')
  actualizarDisponibilidad(
    @Param('id') id: number,
    @Body('disponible') disponible: boolean,
  ): Promise<Driver> {
    return this.driversService.actualizarDisponibilidad(id, disponible);
  }

  @Patch(':id/ganancias')
  actualizarGanancias(
    @Param('id') id: number,
    @Body('monto') monto: number,
  ): Promise<Driver> {
    return this.driversService.actualizarGanancias(id, monto);
  }

  @Patch(':id/calificacion')
  actualizarCalificacion(
    @Param('id') id: number,
    @Body('calificacion') calificacion: number,
  ): Promise<Driver> {
    return this.driversService.actualizarCalificacion(id, calificacion);
  }
}
