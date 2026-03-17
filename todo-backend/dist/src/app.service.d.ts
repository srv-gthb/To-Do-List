import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class AppService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    getTodos(): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }[]>;
    addTask(taskName: string): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }>;
    deleteTask(id: number): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }>;
}
