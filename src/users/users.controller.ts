import { Controller, Get,Patch, Param, Delete, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/shared/authenticate/jwt-auth.guard';
import { RolesGuard } from '../auth/shared/role-acl/roles.guards';
import { Roles } from '../auth/shared/role-acl/roles.decorators';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    ) {}
  
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  getUsers():Promise<User[]> {
    return this.usersService.findAll();
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  getUser(@Param('id') id: string):Promise<User> {
    return this.usersService.findOne(+id);
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto):Promise<User> {
    return this.usersService.updateUser(+id,updateUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
