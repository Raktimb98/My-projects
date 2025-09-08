// server.js (ESM)
import 'dotenv/config'; // loads .env early
import express from 'express';
import connectDB from './DB/index.js'; // should export a promise-returning function

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Basic routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('This is THE about page!');
});

app.get('/api/quotes', (req, res) => {
  const quotes = [
    {
      id: 1,
      title: 'Inspiration',
      content:
        'The only limit to our realization of tomorrow is our doubts of today.',
    },
    {
      id: 2,
      title: 'Motivation',
      content:
        'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    },
    {
      id: 3,
      title: 'Wisdom',
      content: "Life is what happens when you're busy making other plans.",
    },
    {
      id: 4,
      title: 'Perseverance',
      content:
        'It does not matter how slowly you go as long as you do not stop.',
    },
    {
      id: 5,
      title: 'Courage',
      content:
        'You have within you right now, everything you need to deal with whatever the world can throw at you.',
    },
  ];
  res.json(quotes);
});

// Start-up sequence: connect DB, then listen
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to Database:', error);
    process.exit(1);
  });

// Optional: centralized server error handler
app.on('error', (err) => {
  console.error('Server error:', err);
});
