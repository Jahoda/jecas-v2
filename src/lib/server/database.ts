import Database from 'better-sqlite3';
import fs from 'node:fs';

export const db = new Database(fs.readFileSync('./mysqlite3.db'));
db.pragma('journal_mode = WAL');
