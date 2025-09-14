// server.js (ESM)
import 'dotenv/config'; // loads .env early
import app from './app.js';
import connectDB from './DB/index.js'; // should export a promise-returning function

const PORT = Number(process.env.PORT) || 3000;





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
