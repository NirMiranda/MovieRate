import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Application } from 'express';
import cors from 'cors';

import userRoute from './routes/user_routes';
import authRoute from './routes/auth_router';
import movieRoute from './routes/movie_routes';
import reviewRoute from './routes/review_routes';
import fileRouter from './routes/file_router';

dotenv.config();

const initApp = async (): Promise<Application> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    const db = mongoose.connection;

    db.once('open', () => console.log('Connected to MongoDB'));
    db.on('error', (error) => console.error('MongoDB connection error:', error));

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/user', userRoute);
    app.use('/auth', authRoute);
    app.use('/movie', movieRoute);
    app.use('/review', reviewRoute);
    app.use('/file', fileRouter);
    app.use('/public', express.static('public'));

    return app;
  } catch (error) {
    console.error('Error initializing app:', error);
    throw error;
  }
};

export default initApp;
