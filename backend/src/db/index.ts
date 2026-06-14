import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database | null = null;

export async function initDb(): Promise<Database> {
  if (db) return db;

  const dbDir = path.join(__dirname, '../../data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'leads.db');

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.run('PRAGMA foreign_keys = ON;');

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      target_count INTEGER DEFAULT 0,
      current_progress INTEGER DEFAULT 0,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      filters TEXT, -- JSON string for advanced filters
      status TEXT CHECK(status IN ('running', 'paused', 'completed', 'failed')) DEFAULT 'running',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      campaign_id TEXT NOT NULL,
      business_name TEXT NOT NULL,
      category TEXT,
      address TEXT,
      phone TEXT,
      email TEXT,
      website_status TEXT CHECK(website_status IN ('no_website', 'has_website', 'broken_website', 'unknown')) DEFAULT 'unknown',
      website_url TEXT,
      social_links TEXT, -- JSON string for IG, FB, LinkedIn, etc.
      rating REAL,
      reviews_count INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_leads_campaign_id ON leads(campaign_id);

    CREATE TABLE IF NOT EXISTS presets (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      filters TEXT, -- JSON string
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Insert default settings if they don't exist
  const defaultSettings = [
    { key: 'rate_limit_delay', value: '2000' },
    { key: 'dummy_scraper_toggle', value: 'true' }
  ];

  for (const setting of defaultSettings) {
    await db.run(
      'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
      [setting.key, setting.value]
    );
  }

  console.log('Database initialized successfully at:', dbPath);
  return db;
}

export async function getDb(): Promise<Database> {
  if (!db) {
    return initDb();
  }
  return db;
}
