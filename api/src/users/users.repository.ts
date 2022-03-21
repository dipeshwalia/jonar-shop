import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Like, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { GetUsersFilterDto } from './dto/user-filter.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email, address } = authCredentialsDto;

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      email,
      address,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsers(
    filterDto: GetUsersFilterDto,
  ): Promise<{ data: User[]; count: number }> {
    const [users, count] = await this.findAndCount({
      relations: ['orders'],
      order: { username: 'DESC' },
      where: {
        ...(filterDto.search && { username: Like(`%${filterDto.search}`) }),
      },

      take: filterDto.take || 20,
      skip: filterDto.skip || 0,
    });

    return Promise.resolve({
      data: users,
      count,
    });
  }
}
