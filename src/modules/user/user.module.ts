import { Module, forwardRef } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import UserStore from './store/user.store';
import { UserCredentials } from './store/entities/user.credentials.entity';
import User from './store/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserOperationsFacade from './user.operations.facade';
import { AuthModule } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCredentials]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserStore, UserOperationsFacade],
  exports: [UserOperationsFacade, UserStore],
})
export class UserModule {}
