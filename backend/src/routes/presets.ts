import { Router, Request, Response } from 'express';
import { getDb } from '../db';
import crypto from 'crypto';

const router = Router();

// Get all presets
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const presets = await db.all('SELECT * FROM presets ORDER BY created_at DESC');
    res.json(presets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create preset
router.post('/', async (req: Request, res: Response) => {
  const { name, category, location, filters } = req.body;
  if (!name || !category || !location) {
    return res.status(400).json({ error: 'Name, category, and location are required' });
  }

  try {
    const db = await getDb();
    const id = crypto.randomBytes(16).toString('hex');
    await db.run(
      'INSERT INTO presets (id, name, category, location, filters) VALUES (?, ?, ?, ?, ?)',
      [id, name, category, location, filters ? JSON.stringify(filters) : null]
    );

    const newPreset = await db.get('SELECT * FROM presets WHERE id = ?', [id]);
    res.status(201).json(newPreset);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete preset
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const preset = await db.get('SELECT * FROM presets WHERE id = ?', [req.params.id]);
    if (!preset) {
      return res.status(404).json({ error: 'Preset not found' });
    }

    await db.run('DELETE FROM presets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Preset deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
