import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guards';

@Module({
  imports:[ConfigModule.forRoot(),TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: process.env.SECRETKEY, signOptions:{
        expiresIn: '10000s'
    }
})],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,RolesGuard]
})
export class UsersModule {}
