import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../entities/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name:string;
    email:string;
    password:string;
    role:Role
}
