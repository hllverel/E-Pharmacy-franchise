import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};