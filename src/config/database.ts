import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const connectDB = async (): Promise<void> => {
  try {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
