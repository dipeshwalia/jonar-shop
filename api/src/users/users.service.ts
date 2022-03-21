import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { GetUsersFilterDto } from './dto/user-filter.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  getUsers(
    filterDto: GetUsersFilterDto,
  ): Promise<{ data: User[]; count: number }> {
    return this.userRepository.getUsers(filterDto);
  }

  getUsersOrders(): Promise<User[]> {
    return this.userRepository.find();
  }
}
