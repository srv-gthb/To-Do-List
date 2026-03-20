import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUser, logout } from '../lib/auth';
import { TodoItem, addTodo, deleteTodo, loadTodos, toggleTodo } from '../lib/todos';
import styles from '../styles/Home.module.css';

export default function Todos() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUsername(activeUser);

    if (!activeUser) {
      router.replace('/');
      return;
    }

    setTodos(loadTodos(activeUser));
  }, [router]);

  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);

  const handleAdd = () => {
    setError(null);
    const trimmed = draft.trim();
    if (!trimmed) {
      setError('Type something first.');
      return;
    }
    if (!username) return;

    const newList = addTodo(username, trimmed);
    setTodos(newList);
    setDraft('');
  };

  const handleToggle = (id: string) => {
    if (!username) return;
    setTodos(toggleTodo(username, id));
  };

  const handleDelete = (id: string) => {
    if (!username) return;
    setTodos(deleteTodo(username, id));
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.headerRow}>
          <div>
            <h1>My To‑Do List</h1>
            <p className={styles.small}>Logged in as <strong>{username}</strong></p>
          </div>

          <button onClick={handleLogout} className={styles.secondaryButton}>
            Log out
          </button>
        </div>

        <div className={styles.addRow}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a new task and press +"
          />
          <button onClick={handleAdd} className={styles.primaryButton}>
            +
          </button>
        </div>

        {error ? <p className={styles.error}>{error}</p> : null}

        <p className={styles.small}>
          {todos.length === 0
            ? 'You have no tasks yet. Add one to get started!'
            : `${completedCount}/${todos.length} completed`}
        </p>

        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? styles.completed : ''}>
              <button
                className={styles.checkbox}
                onClick={() => handleToggle(todo.id)}
                aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
              >
                {todo.completed ? '✓' : ''}
              </button>
              <span className={styles.todoText}>{todo.text}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(todo.id)}
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
