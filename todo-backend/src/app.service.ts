@Injectable()
export class AppService {
  private todos = [
      { id: 1, task: 'Fix the router', completed: false },
        ];

          getTodos() {
              return this.todos;
                }

                  // Add this function:
                    addTask(taskName: string) {
                        const newTodo = {
                              id: this.todos.length + 1,
                                    task: taskName,
                                          completed: false,
                                              };
                                                  this.todos.push(newTodo);
                                                      return newTodo;
                                                        }
                                                        }