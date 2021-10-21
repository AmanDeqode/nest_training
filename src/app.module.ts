import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.DB_HOST,
    port:parseInt(<string>process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Todo],
    autoLoadEntities:true,
    synchronize:true,
  }),
  JwtModule.register({
    secret: process.env.SECRETKEY, signOptions:{
        expiresIn: process.env.EXPIRESIN
    }
}),
UsersModule,
TodosModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
