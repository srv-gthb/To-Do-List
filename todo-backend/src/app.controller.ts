import { Controller, Get, Post, Body } from '@nestjs/common'; // Add Post and Body
import { AppService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get()
      getAllTasks() {
          return this.appService.getTodos();
            }

              // Add this block:
                @Post()
                  createNewTask(@Body('task') task: string) {
                      return this.appService.addTask(task);
                        }
                        }