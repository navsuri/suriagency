import { Router, Request, Response } from 'express';
import { getDb } from '../db';

const router = Router();

// Get all leads with advanced filtering, search, and pagination
router.get('/', async (req: Request, res: Response) => {
  const {
    campaign_id,
    category,
    website_status,
    search,
    limit = '50',
    offset = '0',
    sort_by = 'created_at',
    sort_order = 'DESC'
  } = req.query;

  try {
    const db = await getDb();
    
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params: any[] = [];

    if (campaign_id) {
      query += ' AND campaign_id = ?';
      params.push(campaign_id);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (website_status) {
      query += ' AND website_status = ?';
      params.push(website_status);
    }

    if (search) {
      query += ' AND (business_name LIKE ? OR address LIKE ? OR phone LIKE ? OR email LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    // Validate sort column to prevent SQL injection
    const allowedSortCols = ['business_name', 'category', 'rating', 'reviews_count', 'created_at'];
    const finalSortCol = allowedSortCols.includes(sort_by as string) ? sort_by : 'created_at';
    const finalSortOrder = (sort_order as string).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${finalSortCol} ${finalSortOrder}`;

    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit as string, 10), parseInt(offset as string, 10));

    const leads = await db.all(query, params);

    // Get total count for pagination metadata
    let countQuery = 'SELECT COUNT(*) as total FROM leads WHERE 1=1';
    const countParams: any[] = [];

    if (campaign_id) {
      countQuery += ' AND campaign_id = ?';
      countParams.push(campaign_id);
    }

    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (website_status) {
      countQuery += ' AND website_status = ?';
      countParams.push(website_status);
    }

    if (search) {
      countQuery += ' AND (business_name LIKE ? OR address LIKE ? OR phone LIKE ? OR email LIKE ?)';
      const searchParam = `%${search}%`;
      countParams.push(searchParam, searchParam, searchParam, searchParam);
    }

    const countResult = await db.get(countQuery, countParams);
    const total = countResult ? countResult.total : 0;

    res.json({
      leads,
      pagination: {
        total,
        limit: parseInt(limit as string, 10),
        offset: parseInt(offset as string, 10)
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
