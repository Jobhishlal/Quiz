import { LoginDTO } from "../../../dto/LoginDTO";

export interface ILoginAdmin {
    execute(credentials: LoginDTO): Promise<{ accessToken: string; refreshToken: string } | null>;
}
