import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";
export class CreateTodoDto {
    id:string;

    user:CreateUserDto;
    
    @IsNotEmpty()
    tasks:string[];
}
