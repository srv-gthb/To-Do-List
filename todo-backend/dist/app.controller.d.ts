import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAllTasks(): {
        id: number;
        task: string;
        completed: boolean;
    }[];
    createNewTask(task: string): {
        id: number;
        task: string;
        completed: boolean;
    };
}
