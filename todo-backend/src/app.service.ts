import { Injectable } from '@nestjs/common'; // <--- THIS WAS MISSING

@Injectable()
export class AppService {
  // Our temporary database
  private todos = [
    { id: 1, task: 'Fix the router', completed: false },
    { id: 2, task: 'Finish Algebra 3 homework', completed: false },
  ];

  getTodos() {
    return this.todos;
  }

  addTask(taskName: string) {
    // We have to define what 'newTodo' is before we can use it!
    const newTodo = {
      id: this.todos.length + 1,
      task: taskName,
      completed: false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }
}