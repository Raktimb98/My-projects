// src/app.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true ,limit: '10kb'}));
app.use(cors());

// Basic routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API running!' });
});
app.get('/about', (req, res) => {
  res.send('This is THE about page!');
});

export default app;
