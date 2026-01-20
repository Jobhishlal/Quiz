import { LoginDTO } from '../interface_adapters/dtos/LoginDTO';

export interface ILoginAdmin {
    execute(credentials: LoginDTO): Promise<{ accessToken: string; refreshToken: string } | null>;
}
