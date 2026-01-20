import apiClient from './apiClient';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    accessToken?: string;
}

export const adminService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/admin/login', credentials);
        return response.data;
    }
};

