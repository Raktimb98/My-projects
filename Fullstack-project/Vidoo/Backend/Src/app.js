import express from 'express';
// import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes import and use here
import userRouter from './Routes/user.routes.js';

// Routes declaration here
app.use('/api/v1/users', userRouter);

export default app;