import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./shared/authenticate/jwt-auth.guard";
import { JwtStrategy } from "./shared/authenticate/jwt.strategy";
import { RolesGuard } from "./shared/role-acl/roles.guards";

@Module({
    imports:[ConfigModule.forRoot(),TypeOrmModule.forFeature([User]),JwtModule.register({
        secret: process.env.SECRETKEY, signOptions:{
            expiresIn: '1d'
        }
    })],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy,RolesGuard,JwtAuthGuard],
    exports:[AuthService,RolesGuard,JwtStrategy]
})

export class AuthModule {}
