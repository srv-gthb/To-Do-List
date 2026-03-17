import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAllTasks(): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }[]>;
    createNewTask(task: string): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }>;
    deleteTask(id: string): Promise<{
        task: string;
        id: number;
        completed: boolean;
    }>;
}
