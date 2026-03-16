export declare class AppService {
    private todos;
    getTodos(): {
        id: number;
        task: string;
        completed: boolean;
    }[];
    addTask(taskName: string): {
        id: number;
        task: string;
        completed: boolean;
    };
}
