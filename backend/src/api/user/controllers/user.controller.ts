import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';

import { JwtAuthenticationGuard } from '../../../guards/jwt.authentication.guard';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get('/me')
  async getUser(@Req() req) {
    return req['user'];
  }

  @HttpCode(200)
  @Get('/')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
