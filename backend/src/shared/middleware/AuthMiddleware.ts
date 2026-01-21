import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../enums/HttpStatus';
import config from '../../config/env';

interface DecodedToken {
    userId: string;
    email: string;
    role: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // DEBUG LOGS
            console.log('AuthMiddleware: Verifying token...');
            console.log('AuthMiddleware: Token:', token.substring(0, 20) + '...');
            console.log('AuthMiddleware: Secret Length:', config.jwt.accessSecret.length);

            // Use config.jwt.accessSecret to match LoginStudent
            const decoded = jwt.verify(token, config.jwt.accessSecret) as DecodedToken;

            console.log('AuthMiddleware: Token verified successfully for user:', decoded.userId);

            (req as any).user = decoded;
            next();
        } catch (error: any) {
            console.error('Auth Middleware Error Name:', error.name);
            console.error('Auth Middleware Error Message:', error.message);
            console.error('Auth Middleware Full Error:', error);
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'Not authorized, token failed',
                error: error.message,
                type: error.name
            });
        }
    }

    if (!token) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Not authorized, no token' });
    }
};
