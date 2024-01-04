import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { ITokenResponse } from '../../common/types';
import { User } from '../user/entities/user.entity';
import { hashString } from '../../common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async returnToken(user: Partial<User>): Promise<string> {
    return this.jwtService.sign({ userId: user.id, email: user.email });
  }

  async login(dto: LoginDTO): Promise<ITokenResponse> {
    const user = await this.userService.validateUser(dto);

    const token = await this.returnToken(user);

    return { token };
  }

  async register(dto: RegisterDTO): Promise<ITokenResponse> {
    const existingUser = await this.userService.getUser({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashString(dto.password);
    const newUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const token = await this.returnToken(newUser);
    return { token };
  }
}
