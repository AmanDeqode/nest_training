import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { LoginUserDto } from "src/users/dto/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService,
      private jwtService:JwtService
      ) {}
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) :Promise<User> { 
      try {
        return await this.authService.register(createUserDto);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
      try {
        const user = await this.authService.login(loginUserDto);
        const payload = {name:user.name,sub:user.id,role:user.role}
        return {
          access_token:this.jwtService.sign(payload)
        } 
      } catch (error) {
        throw new Error(error.message);
      }
    }
}
