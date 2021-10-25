import { Todo } from "src/todos/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:string;

    @Column({type:'varchar',nullable:false})
    name:string;

    @Column({type:"varchar",nullable:false,unique:true})
    email:string;

    @Column({type:"varchar",nullable:false})
    password:string

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role:Role

    @OneToMany('Todo',(tasks:Todo)=> tasks.user,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    tasks:Todo[]
}
