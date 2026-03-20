import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { getCurrentUser, signup } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    const result = signup(username.trim(), password);
    if (result.success) {
      router.push('/todos');
    } else {
      setError(result.message ?? 'Unable to sign up.');
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1>Create an account</h1>
        <p>Create a username and password to save your tasks locally.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              required
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.primaryButton}>
            Sign up
          </button>
        </form>

        <p className={styles.small}>
          Already have an account? <Link href="/">Log in</Link>.
        </p>
      </section>
    </main>
  );
}
