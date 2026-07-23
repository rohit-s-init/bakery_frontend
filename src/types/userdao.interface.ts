import User from "./user.interface";

export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    user: User;
}

export interface VerifyRequest {
    email: string;
    otp: number;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface MeResponse {
    success: boolean;
    user?: User;
    message?: string;
}