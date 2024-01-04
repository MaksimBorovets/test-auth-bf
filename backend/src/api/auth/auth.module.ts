import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
