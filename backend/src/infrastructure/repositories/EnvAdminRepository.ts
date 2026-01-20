import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { Admin } from '../../domain/entities/Admin';
import config from '../../config/env';

export class EnvAdminRepository implements IAdminRepository {
    async getAdminCredentials(): Promise<Admin> {
        // Determine source: Requirement says "backend constant store admin email and password in env"
        // So we just return what is in the config (loaded from env)
        return new Admin(config.admin.email, config.admin.pass);
    }
}
