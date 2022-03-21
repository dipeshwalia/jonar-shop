import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersFilterDto } from './dto/user-filter.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiTags('Users')
  getUsers(
    @Query() filterDto: GetUsersFilterDto,
  ): Promise<{ data: User[]; count: number }> {
    return this.userService.getUsers(filterDto);
  }
}
