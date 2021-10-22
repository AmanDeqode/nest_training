import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Todo } from "src/todos/entities/todo.entity";
import { Role } from "../entities/role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password:string;

    tasks?:Todo[];

    /* @IsString()
    @IsNotEmpty()
    role:Role */
}
