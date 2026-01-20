import mongoose from 'mongoose';
import config from '../../config/env';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};
