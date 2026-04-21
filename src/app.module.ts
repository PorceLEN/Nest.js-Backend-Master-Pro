import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './structure/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './structure/users/products/products.module';
import { Product } from './structure/users/products/entities/product.entity';
import { UsersModule } from './structure/users/users.module';
import { AuthModule } from './structure/auth/auth.module';
import { PasswordService } from './structure/password/password.service';
import { PasswordModule } from './structure/password/password.module';
import { FilesModule } from './structure/files/files.module';
import { MailsModule } from './structure/mails/mails.module';
import { CategoryModule } from './structure/category/category.module';
import { Category } from './structure/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Product, Category],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    PasswordModule,
    FilesModule,
    MailsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService],
})
export class AppModule {}
