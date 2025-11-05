import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'rappi',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
};

TypeOrmModule.forRoot({
  // ... otras configuraciones
  logging: true, // Habilita el logging
  logger: 'advanced-console', // Muestra consultas detalladas
});
