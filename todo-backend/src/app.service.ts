import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  // We leave the constructor out so Prisma uses the .env file automatically
  
  async onModuleInit() {
    await this.$connect();
  }

  async getTodos() {
    return this.task.findMany();
  }

  async addTask(taskName: string) {
    return this.task.create({
      data: { 
        task: taskName,
        completed: false 
      },
    });
  }

  async deleteTask(id: number) {
    return this.task.delete({
      where: { id: id },
    });
  }
}