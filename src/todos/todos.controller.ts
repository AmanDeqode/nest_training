import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/authenticate/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodosController {
  @Inject()
  todosService:TodosService;

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto,@Request() req): Promise<Todo> {
    const user = req.user;
    return this.todosService.create(createTodoDto,user.id);
  }
  @Get()
  getTodos(@Request() req) {
    return this.todosService.findAll(req.user.id);
  }
  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
