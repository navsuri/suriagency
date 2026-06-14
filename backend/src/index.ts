import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { initDb } from './db';

// Import routes
import campaignsRouter from './routes/campaigns';
import leadsRouter from './routes/leads';
import presetsRouter from './routes/presets';
import settingsRouter from './routes/settings';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/campaigns', campaignsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/presets', presetsRouter);
app.use('/api/settings', settingsRouter);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static assets in production or if build files exist
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log('Serving frontend static files from:', frontendDistPath);
  app.use(express.static(frontendDistPath));
  
  // Direct all other routes to frontend's index.html (supports client-side routing!)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  console.log('Frontend build directory not found at:', frontendDistPath);
  console.log('Backend will only serve API endpoints.');
}

// Start Server
async function startServer() {
  try {
    // Initialize Database
    await initDb();
    
    app.listen(PORT, '0.0.0.0' as any, () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
