import { LoginDTO } from '../dtos/LoginDTO';
import { MESSAGES } from '../../domain/constants/messages';

export class AdminValidator {
    static validateLogin(body: any): LoginDTO {
        const { email, password } = body;

        if (!email) {
            throw new Error(MESSAGES.EMAIL_REQUIRED);
        }
        if (!password) {
            throw new Error(MESSAGES.PASSWORD_REQUIRED);
        }

        return { email, password };
    }
}
