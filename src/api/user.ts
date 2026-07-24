import { ApiResponse, LoginRequest, LoginResponse, MeResponse, RegisterRequest, VerifyRequest } from "@/types/userdao.interface";

// const BASE_URL = "http://localhost:9000/api/user";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ---------------- Register ---------------- */

export async function register(data: RegisterRequest): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    return response.json();
}

/* ---------------- Verify ---------------- */

export async function verify(data: VerifyRequest): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    return response.json();
}

/* ---------------- Login ---------------- */
export async function login(data: LoginRequest): Promise<LoginResponse> {
    console.log("inside the login")
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    console.log(response);

    return response.json();
}

/* ---------------- Get Me ---------------- */

export async function getMe(): Promise<MeResponse> {
    const response = await fetch(`${BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}

export async function logout(): Promise<MeResponse> {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}


/* ---------------- Google Login ---------------- */

export async function googleLogin(
    credential: string
): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/google-login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            token: credential,
        }),
    });

    return response.json();
}