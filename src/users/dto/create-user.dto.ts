import { Todo } from "src/todos/entities/todo.entity";
import { Role } from "../entities/role.enum";

export class CreateUserDto {
    name:string;
    email:string;
    password:string;
    tasks?:Todo[];
    role:Role
}
