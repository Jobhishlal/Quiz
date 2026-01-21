import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

interface Config {
    port: number;
    mongoUri: string;
    admin: {
        email: string;
        pass: string; // Stored in env as per requirement
    };
    jwt: {
        accessSecret: string;
        refreshSecret: string;
    };
}

const config: Config = {
    port: parseInt(process.env.PORT || '5000', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/quiz-app',
    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
        pass: process.env.ADMIN_PASSWORD || 'admin123',
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
    },
};

export default config;
