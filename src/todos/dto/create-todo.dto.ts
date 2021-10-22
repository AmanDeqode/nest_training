import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateTodoDto {
    id:string;
    user:User;
    @IsNotEmpty()
    tasks:string[];
}
