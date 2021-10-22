import { Controller, Get,Patch, Param, Delete, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/authenticate/jwt-auth.guard';
import { RolesGuard } from '../auth/authenticate/roles.guards';
import { Roles } from '../auth/authenticate/roles.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    ) {}
  
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  updateUser(@Param('id') id:string, @Body() createUserDto:CreateUserDto) {
    return this.usersService.updateUser(+id,createUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
