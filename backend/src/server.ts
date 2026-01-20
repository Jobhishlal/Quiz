import app from './app';
import config from './config/env';
import { connectDB } from './infrastructure/database/mongoose';

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
        console.log(`Admin Email loaded: ${config.admin.email}`);
    });
};

startServer();
