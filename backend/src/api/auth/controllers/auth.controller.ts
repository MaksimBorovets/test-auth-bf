import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { RegisterDTO, LoginDTO } from '../dto/auth.dto';
import { IMessageResponse, ITokenResponse } from '../../../common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Body() body: LoginDTO): Promise<ITokenResponse> {
    return this.authService.login(body);
  }

  @HttpCode(201)
  @Post('/register')
  register(@Body() body: RegisterDTO): Promise<ITokenResponse> {
    return this.authService.register(body);
  }
}
