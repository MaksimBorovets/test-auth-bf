import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { LoginDTO } from '../../auth/dto/auth.dto';
import ERROR_MESSAGES from '../../../common/constants/errors';
import { verify } from '../../../common/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }

  async getUserQuery(id: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select(['user.id', 'user.email'])
      .getOne();
  }

  getUserWithoutPassword(user: User): Partial<User> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUser(dto: LoginDTO): Promise<Partial<User>> {
    const user = await this.getUser({ where: { email: dto.email } });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_USER);
    }

    const isMatch = await verify(user.password, dto.password);
    if (!isMatch) {
      throw new BadRequestException(ERROR_MESSAGES.WRONG_LOGIN);
    }

    return this.getUserWithoutPassword(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email'],
    });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async resetPassword({ email, password }: Partial<User>): Promise<User> {
    const user = await this.getUser({ where: { email } });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_USER);
    }

    user.password = password;
    return this.userRepository.save(user);
  }
}
