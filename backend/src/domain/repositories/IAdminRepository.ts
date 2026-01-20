import { Admin } from '../entities/Admin';

export interface IAdminRepository {
    getAdminCredentials(): Promise<Admin>;
}
