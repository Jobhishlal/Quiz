import jwt from 'jsonwebtoken';
import config from '../../config/env';

export class JwtService {
    static generateAccessToken(payload: string | object | Buffer): string {
        return jwt.sign(payload, config.jwt.accessSecret, { expiresIn: '15m' });
    }

    static generateRefreshToken(payload: string | object | Buffer): string {
        return jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: '7d' });
    }

    static verifyAccessToken(token: string): any {
        return jwt.verify(token, config.jwt.accessSecret);
    }

    static verifyRefreshToken(token: string): any {
        return jwt.verify(token, config.jwt.refreshSecret);
    }
}
