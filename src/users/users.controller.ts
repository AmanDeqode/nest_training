import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guards';
import { Roles } from './auth/roles.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService:JwtService
    ) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) :Promise<User> { 
    return this.usersService.register(createUserDto);
  }
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    const payload = {name:user.name,sub:user.id}
    return {
      access_token:this.jwtService.sign(payload)
    };
  }
  
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
