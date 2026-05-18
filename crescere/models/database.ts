// models/database.ts

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'crescere.db';

let _db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync(DB_NAME);
  await initSchema(_db);
  return _db;
}

async function initSchema(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS tasks (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      title         TEXT    NOT NULL,
      description   TEXT,
      priority      TEXT    NOT NULL DEFAULT 'medium'
                              CHECK(priority IN ('low', 'medium', 'high')),
      order_index   INTEGER NOT NULL DEFAULT 0,
      scheduled_date TEXT   NOT NULL,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS completions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id      INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
      completed_at TEXT    NOT NULL DEFAULT (datetime('now')),
      date         TEXT    NOT NULL,
      note         TEXT
    );

    CREATE TABLE IF NOT EXISTS weekly_goals (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      week_start   TEXT    NOT NULL UNIQUE,
      target_count INTEGER NOT NULL DEFAULT 5,
      label        TEXT
    );

    CREATE TABLE IF NOT EXISTS monthly_summaries (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      month            TEXT    NOT NULL UNIQUE,
      total_tasks      INTEGER NOT NULL DEFAULT 0,
      completed_tasks  INTEGER NOT NULL DEFAULT 0,
      completion_rate  REAL    NOT NULL DEFAULT 0,
      average_mood     REAL,
      notes            TEXT
    );
  `);
}
