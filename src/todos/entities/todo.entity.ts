import { User } from "src/users/entities/user.entity";
import { Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id:string;

    @Column({type:'varchar',nullable:false})
    tasks:string;

    @ManyToOne('User', (user:User) => user.tasks)
    @JoinColumn({name:'user_id'})
    user:User

}
