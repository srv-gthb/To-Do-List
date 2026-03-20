export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

const canUseStorage = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

function todoKey(username: string) {
  return `todo-items:${username}`;
}

function readTodos(username: string): TodoItem[] {
  if (!canUseStorage) return [];
  try {
    const raw = localStorage.getItem(todoKey(username));
    return raw ? (JSON.parse(raw) as TodoItem[]) : [];
  } catch {
    return [];
  }
}

function writeTodos(username: string, todos: TodoItem[]) {
  if (!canUseStorage) return;
  localStorage.setItem(todoKey(username), JSON.stringify(todos));
}

export function loadTodos(username: string): TodoItem[] {
  return readTodos(username);
}

export function addTodo(username: string, text: string): TodoItem[] {
  const existing = readTodos(username);
  const item: TodoItem = {
    id: typeof crypto !== 'undefined' ? crypto.randomUUID() : String(Date.now()),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const next = [item, ...existing];
  writeTodos(username, next);
  return next;
}

export function toggleTodo(username: string, id: string): TodoItem[] {
  const existing = readTodos(username);
  const next = existing.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );
  writeTodos(username, next);
  return next;
}

export function deleteTodo(username: string, id: string): TodoItem[] {
  const existing = readTodos(username);
  const next = existing.filter((item) => item.id !== id);
  writeTodos(username, next);
  return next;
}
