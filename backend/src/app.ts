import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import adminRoutes from './interface_adapters/routes/AdminRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Vite Frontend
    credentials: true // Allow cookies
}));
app.use(express.json());


// Routes
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

export default app;
