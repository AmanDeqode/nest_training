import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  userRepository:Repository<User>

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number|string) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException(`User for id = ${id} not found`);
    return user;
  }

  async updateUser(id:number|string, createUserDto:CreateUserDto) {
    console.log(createUserDto);
    const user = await this.userRepository.findOne(id)
    const updateUser = new User();

  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
