import path from 'path';
import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import adminRoutes from './interface_adapters/routes/AdminRoutes';
import quizRoutes from './interface_adapters/routes/QuizRoutes';
import studentRoutes from './interface_adapters/routes/studentRoutes';

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/admin', quizRoutes);
app.use('/api/student', studentRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

export default app;
