import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to Database, HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('Error connecting to Database:', error);
    process.exit(1);
  }
};

export default connectDB;
