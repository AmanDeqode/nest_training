import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/entities/user.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { Role } from "src/users/entities/role.enum";

@Injectable()
export class AuthService {
    @InjectRepository(User)
    userRepository:Repository<User>

    async checkExistingUser(email:string) {
      try {
        const existingUser = await this.userRepository.findOne({email:email});
        return existingUser; 
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async register(createUserDto: CreateUserDto) {
      try {
        const existingUser = await this.checkExistingUser(createUserDto.email);
  
        if(existingUser) throw new BadRequestException('email id already exists');
        const {name,email,password} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.role = Role.USER;
        const data:User = await this.userRepository.save(user);
        return data; 
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async login(loginUserDto:LoginUserDto) {
      try {
        const existingUser = await this.checkExistingUser(loginUserDto.email);
        if(!existingUser) throw new BadRequestException('Invalid credentials');
        const matchPassword = await bcrypt.compare(loginUserDto.password,existingUser.password);
        if(!matchPassword) throw new BadRequestException('Invalid credentials');
        return existingUser; 
      } catch (error) {
        throw new Error(error.message);
      }
    }
}
