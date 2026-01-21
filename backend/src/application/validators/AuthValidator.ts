import { AUTH_MESSAGES } from '../../domain/constants/auth/AuthMessages';

export class AuthValidator {
    static validateSignupInput(data: any): void {
        const { username, email, dob, password } = data;

        if (!username || !email || !dob || !password) {
            throw new Error(AUTH_MESSAGES.ALL_FIELDS_REQUIRED);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error(AUTH_MESSAGES.INVALID_EMAIL_FORMAT);
        }

        if (password.length < 8) {
            throw new Error(AUTH_MESSAGES.WEAK_PASSWORD);
        }
    }

    static validateLoginInput(data: any): void {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error(AUTH_MESSAGES.EMAIL_PASSWORD_REQUIRED);
        }
    }
}
