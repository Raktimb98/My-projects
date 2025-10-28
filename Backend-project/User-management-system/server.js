// server.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM received, shutting down...');
  process.exit(0);
});
