export type UserRecord = {
  username: string;
  password: string;
};

const USERS_KEY = 'todo-users';
const ACTIVE_USER_KEY = 'todo-active-user';
const canUseStorage = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

function readUsers(): UserRecord[] {
  if (!canUseStorage) return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as UserRecord[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: UserRecord[]) {
  if (!canUseStorage) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): string | null {
  if (!canUseStorage) return null;
  return localStorage.getItem(ACTIVE_USER_KEY);
}

export function setCurrentUser(username: string | null) {
  if (!canUseStorage) return;
  if (username) {
    localStorage.setItem(ACTIVE_USER_KEY, username);
  } else {
    localStorage.removeItem(ACTIVE_USER_KEY);
  }
}

export function signup(username: string, password: string) {
  if (!username.trim()) {
    return { success: false, message: 'Username is required.' };
  }
  if (!password) {
    return { success: false, message: 'Password is required.' };
  }

  const normalized = username.trim().toLowerCase();
  const users = readUsers();
  const already = users.find((u) => u.username === normalized);

  if (already) {
    return { success: false, message: 'That username is already taken.' };
  }

  users.push({ username: normalized, password });
  writeUsers(users);
  setCurrentUser(normalized);

  return { success: true };
}

export function login(username: string, password: string) {
  const normalized = username.trim().toLowerCase();
  const users = readUsers();
  const match = users.find((u) => u.username === normalized && u.password === password);

  if (!match) {
    return false;
  }

  setCurrentUser(normalized);
  return true;
}

export function logout() {
  setCurrentUser(null);
}
