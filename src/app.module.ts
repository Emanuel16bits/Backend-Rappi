import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { typeOrmConfig } from './database/typeorm.config';
import { OrderItemsModule } from './order-items/order-items.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RestaurantsModule,
    ProductsModule,
    OrdersModule,
    ReviewsModule,
    OrderItemsModule,
    FavoritesModule,
    DriversModule,
  ],
})
export class AppModule {}
