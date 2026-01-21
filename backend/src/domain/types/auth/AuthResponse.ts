export interface AuthResponse {
    success: boolean;
    message?: string;
    accessToken: string;
    refreshToken: string;
}
