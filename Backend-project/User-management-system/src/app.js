import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());

// Basic routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API running!' });
});

app.get('/about', (req, res) => {
  res.send('This is THE about page!');
});

// Auth routes only (no userRouter since file missing)
app.use('/api/v1/auth', authRouter);

export default app;
