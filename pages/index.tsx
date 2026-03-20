import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { getCurrentUser, login } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (activeUser) {
      router.replace('/todos');
    }
  }, [router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const success = login(username.trim(), password);
    if (success) {
      router.push('/todos');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1>To‑Do List</h1>
        <p>Log in to see and manage your saved tasks.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.primaryButton}>
            Log in
          </button>
        </form>

        <p className={styles.small}>
          New here? <Link href="/signup">Create an account</Link>.
        </p>
      </section>
    </main>
  );
}
