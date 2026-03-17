import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTasks() {
    return this.appService.getTodos();
  }

  @Post()
  createNewTask(@Body('task') task: string) {
    return this.appService.addTask(task);
  }

  // Ensure this is INSIDE the class braces
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.appService.deleteTask(Number(id));
  }
}