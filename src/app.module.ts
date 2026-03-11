import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './password/password.service';
import { PasswordModule } from './password/password.module';
import { FilesModule } from './files/files.module';
import { MailsModule } from './mails/mails.module';
import { SerializeService } from './auth/serialize/serialize.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Product],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    PasswordModule,
    FilesModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService, SerializeService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
  }
}
// finaliser ça aussi
