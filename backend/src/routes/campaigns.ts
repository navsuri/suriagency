import { Router, Request, Response } from 'express';
import { getDb } from '../db';
import crypto from 'crypto';

const router = Router();

// Get all campaigns
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaigns = await db.all('SELECT * FROM campaigns ORDER BY created_at DESC');
    res.json(campaigns);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get campaign by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create campaign
router.post('/', async (req: Request, res: Response) => {
  const { name, target_count, category, location, filters } = req.body;
  if (!name || !category || !location) {
    return res.status(400).json({ error: 'Name, category, and location are required' });
  }

  try {
    const db = await getDb();
    const id = crypto.randomBytes(16).toString('hex');
    await db.run(
      `INSERT INTO campaigns (id, name, target_count, current_progress, category, location, filters, status)
       VALUES (?, ?, ?, 0, ?, ?, ?, 'running')`,
      [id, name, target_count || 100, category, location, filters ? JSON.stringify(filters) : null]
    );

    const newCampaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [id]);
    res.status(201).json(newCampaign);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Pause campaign
router.post('/:id/pause', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    await db.run(
      'UPDATE campaigns SET status = "paused", updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [req.params.id]
    );

    const updated = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Resume campaign
router.post('/:id/resume', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    await db.run(
      'UPDATE campaigns SET status = "running", updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [req.params.id]
    );

    const updated = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete campaign
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Since we have ON DELETE CASCADE on foreign key campaign_id, deleting the campaign will delete its leads as well
    await db.run('DELETE FROM campaigns WHERE id = ?', [req.params.id]);
    res.json({ message: 'Campaign and its leads deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get leads for a specific campaign
router.get('/:id/leads', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const campaign = await db.get('SELECT * FROM campaigns WHERE id = ?', [req.params.id]);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const leads = await db.all('SELECT * FROM leads WHERE campaign_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
