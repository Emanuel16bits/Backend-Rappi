import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private repositorioDrivers: Repository<Driver>,
  ) {}

  async obtenerTodos(): Promise<Driver[]> {
    return this.repositorioDrivers.find();
  }

  async obtenerUno(id: number): Promise<Driver> {
    const driver = await this.repositorioDrivers.findOne({ where: { id } });
    if (!driver) throw new NotFoundException('Driver no encontrado');
    return driver;
  }

  async crear(driverData: Partial<Driver>): Promise<Driver> {
    const driver = this.repositorioDrivers.create(driverData);
    return this.repositorioDrivers.save(driver);
  }

  async actualizarDisponibilidad(id: number, disponible: boolean): Promise<Driver> {
    const driver = await this.obtenerUno(id);
    driver.disponible = disponible;
    return this.repositorioDrivers.save(driver);
  }

  async actualizarGanancias(id: number, monto: number): Promise<Driver> {
    const driver = await this.obtenerUno(id);
    driver.gananciasTotales += monto;
    return this.repositorioDrivers.save(driver);
  }

  async actualizarCalificacion(id: number, calificacion: number): Promise<Driver> {
    const driver = await this.obtenerUno(id);
    driver.calificacion = calificacion;
    return this.repositorioDrivers.save(driver);
  }
}


