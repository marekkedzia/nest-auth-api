import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import UserService from './user.service';
import { UserId } from './schemas/user.types';
import { CreateUserDto } from './schemas/create.user.dto';
import { UserCredentials } from './store/entities/user.credentials.entity';
import { CreateUserCredentialsDto } from './schemas/user.credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../auth/schemas/jwt.types';
import { variablesConfig } from '../../config';

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(
    AuthGuard(variablesConfig.jwt.strategies.jwtRequireUserCredentials),
  )
  @Get('credentials')
  getUserCredentialsList(): Promise<UserCredentials[]> {
    return this.userService.getUserCredentialsList();
  }

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<UserId> {
    return this.userService.registerUser(createUserDto);
  }

  @UseGuards(AuthGuard(variablesConfig.jwt.strategies.basic))
  @Post(':userId/credentials')
  createUserCredentials(
    @Request() req: { user: JwtPayload },
    @Body() createUserCredentialsDto: CreateUserCredentialsDto,
  ): Promise<void> {
    return this.userService.createUserCredentials(
      createUserCredentialsDto,
      req.user.userId,
    );
  }
}

export default UserController;
