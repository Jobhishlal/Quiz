import { NextFunction, Request, Response } from 'express';
import { ILoginAdmin } from '../../application/usecase/admin/login/ILoginAdmin';
import { AdminValidator } from '../validators/AdminValidator';
import { MESSAGES } from '../../domain/constants/messages';
import { CookieHelper } from '../../shared/helpers/CookieHelper';
import { HTTP_STATUS } from '../../shared/enums/HttpStatus';

export class AdminController {
    constructor(
        private loginAdmin: ILoginAdmin
    ) { }


    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = AdminValidator.validateLogin(req.body);
            const tokens = await this.loginAdmin.execute(dto);

            if (tokens) {
                CookieHelper.setRefreshToken(res, tokens.refreshToken);
                res.status(HTTP_STATUS.OK).json({
                    success: true,
                    message: MESSAGES.LOGIN_SUCCESS,
                    accessToken: tokens.accessToken
                });
            } else {
                throw new Error(MESSAGES.INVALID_CREDENTIALS);
            }
        } catch (error: any) {
            if (error.message === MESSAGES.INVALID_CREDENTIALS) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: error.message });
            } else if (error.message === MESSAGES.EMAIL_REQUIRED || error.message === MESSAGES.PASSWORD_REQUIRED) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: error.message });
            } else {
                console.error(error);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: MESSAGES.INTERNAL_ERROR });
            }
        }
    }
}
