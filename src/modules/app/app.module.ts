import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user';
import * as path from 'path';
import UserEntity from '../user/store/entities/user.entity';
import { UserCredentials } from '../user/store/entities/user.credentials.entity';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '../../config';
import { AuthModule } from '../auth';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '.', 'sello.db'),
      entities: [UserEntity, UserCredentials],
      synchronize: appConfig.SYNC_DB,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: appConfig.JWT_SECRET,
      signOptions: { algorithm: 'HS256' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
