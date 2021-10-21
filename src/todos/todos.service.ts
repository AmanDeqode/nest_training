import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  @InjectRepository(Todo)
  todoRepository:Repository<Todo>

  async create(createTodoDto: CreateTodoDto,user) {
    const {tasks} = createTodoDto;
    const todo = new Todo()
    todo.tasks = tasks
    todo.user = user
    await this.todoRepository.save(todo);
    delete todo.user
    return todo;
  }

  async findAll(userId) {
    return await this.todoRepository.find();
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne(id);
    return await this.todoRepository.remove(todo);
  }
}
