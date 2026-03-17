"use client";
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const refreshTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { refreshTasks(); }, []);

  const addTask = async () => {
    if (!newTask) return;
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
    setNewTask("");
    refreshTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });
    refreshTasks();
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">To-Do Hub</h1>
      
      <div className="flex gap-2 mb-8">
        <input 
          className="bg-gray-800 border border-gray-700 p-2 rounded w-64 text-white"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={addTask} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
          Add
        </button>
      </div>

      <div className="space-y-4 w-full max-w-md">
        {tasks.map((item) => (
          <div key={item.id} className="p-4 bg-gray-800 border border-gray-700 rounded-lg flex justify-between items-center">
            <span>{item.task}</span>
            <button 
              onClick={() => deleteTask(item.id)} 
              className="text-red-500 hover:text-red-400 font-bold px-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}