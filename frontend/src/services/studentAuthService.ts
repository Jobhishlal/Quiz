import apiClient from './apiClient';

export interface StudentSignupData {
    username: string;
    email: string;
    dob: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    accessToken: string;
    username: string;
}

const studentAuthService = {
    signup: async (data: StudentSignupData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/student/signup', data);
        return response.data;
    },

    login: async (data: Pick<StudentSignupData, 'email' | 'password'>): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/student/login', data);
        return response.data;
    }
};

export default studentAuthService;
