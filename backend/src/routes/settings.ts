import { Router, Request, Response } from 'express';
import { getDb } from '../db';

const router = Router();

// Get all settings
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM settings');
    
    // Convert array of key-value pairs to a neat dictionary object
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings
router.put('/', async (req: Request, res: Response) => {
  const updates = req.body; // Expecting an object of key-value pairs
  
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Body must be an object of key-value updates' });
  }

  try {
    const db = await getDb();
    
    // Use a transaction for atomic and safe updates
    await db.run('BEGIN TRANSACTION;');
    
    for (const [key, value] of Object.entries(updates)) {
      await db.run(
        'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
        [key, String(value)]
      );
    }
    
    await db.run('COMMIT;');
    
    // Return all updated settings
    const rows = await db.all('SELECT * FROM settings');
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    
    res.json(settings);
  } catch (error: any) {
    try {
      const db = await getDb();
      await db.run('ROLLBACK;');
    } catch (e) {}
    res.status(500).json({ error: error.message });
  }
});

export default router;
