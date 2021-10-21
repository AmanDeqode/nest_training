import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  userRepository:Repository<User>

  async checkExistingUser(email:string) {
    const existingUser = await this.userRepository.findOne({email:email});
    return existingUser;
  }
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.checkExistingUser(createUserDto.email);

    if(existingUser) throw new BadRequestException('email id already exists');
    console.log(createUserDto);
    const {name,email,password,tasks,role} = createUserDto;
    const hashedPassword = await bcrypt.hash(password,12);
    const data:User = await this.userRepository.save({
      name,
      email,
      password:hashedPassword,
      tasks,
      role
    });
    return data;
  }
  async login(loginUserDto:LoginUserDto) {
    const existingUser = await this.checkExistingUser(loginUserDto.email);
    if(!existingUser) throw new BadRequestException('Invalid credentials');
    const matchPassword = await bcrypt.compare(loginUserDto.password,existingUser.password);
    if(!matchPassword) throw new BadRequestException('Invalid credentials');
    return existingUser;
  }
  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }
  async findOne(id: number|string) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException(`User for id = ${id} not found`);
    return user;
  }
  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
