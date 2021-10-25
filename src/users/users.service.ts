import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  userRepository:Repository<User>

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;

    } catch (error) {
      throw new Error(error.messge);
    }
  }

  async findOne(id: number|string) {
    try {
      const user = await this.userRepository.findOne(id);
      if(!user) throw new NotFoundException(`User for id = ${id} not found`);
      return user; 
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id:number|string, updateUserDto:UpdateUserDto) {
    try {
      console.log(updateUserDto);
      console.log(updateUserDto);
      const user = await this.userRepository.findOne(id)
      if(updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password,12);
      }
      user.name = updateUserDto.name || user.name;
      user.email = updateUserDto.email || user.email;
      user.password = updateUserDto.password|| user.password;
      user.role = updateUserDto.role || user.role;
      return await this.userRepository.save(user); 
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      return this.userRepository.remove(user); 
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
