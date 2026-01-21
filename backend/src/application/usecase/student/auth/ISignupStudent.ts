export interface ISignupStudent {
    execute(studentData: any): Promise<{ accessToken: string; refreshToken: string }>;
}
