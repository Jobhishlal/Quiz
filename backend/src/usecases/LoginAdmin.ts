import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { LoginDTO } from '../interface_adapters/dtos/LoginDTO';
import { JwtService } from '../infrastructure/services/JwtService';
import { ILoginAdmin } from './ILoginAdmin';

export class LoginAdmin implements ILoginAdmin {
    constructor(private adminRepository: IAdminRepository) { }

    async execute(credentials: LoginDTO): Promise<{ accessToken: string; refreshToken: string } | null> {
        const admin = await this.adminRepository.getAdminCredentials();

       
        if (admin.email === credentials.email && admin.password === credentials.password) {
            const payload = { email: admin.email, role: 'admin' };
            const accessToken = JwtService.generateAccessToken(payload);
            const refreshToken = JwtService.generateRefreshToken(payload);
            return { accessToken, refreshToken };
        }
        return null;
    }
}
