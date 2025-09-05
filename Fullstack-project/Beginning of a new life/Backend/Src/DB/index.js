import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Connected to Database, HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('Error connecting to Database:', error);
    process.exit(1);
  }
};

export default connectDB;