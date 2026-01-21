import { AuthResponse } from "../../../../../domain/types/auth/AuthResponse";
import { LoginDto } from "../../../../../domain/dtos/auth/LoginDto";

export interface ILoginStudent {
    execute(data: LoginDto): Promise<AuthResponse>;
}
