import User from "@/types/user.interface";
import { ApiResponse, LoginRequest, LoginResponse, MeResponse, RegisterRequest, VerifyRequest } from "@/types/userdao.interface";

// const BASE_URL = "http://localhost:9000/api/user";
const BASE_URL = "https://bakery-backend-1-ltml.onrender.com/api/user";

function saveLocalUser(user: User) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            user: user,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        })
    );
}

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

    const result = await response.json();

    if (!result.success) {
        return result;
    }

    const meResp: MeResponse = await getMe();

    if (!meResp.success) {
        console.error(meResp.message);
    }

    if (meResp.success) {
        saveLocalUser(meResp.user!);
    }

    return result;
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

    const result: LoginResponse = await response.json();

    if (result.success) {
        saveLocalUser(result.user);
    }

    return result;
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

    localStorage.removeItem("auth");

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

    const result: LoginResponse = await response.json();
    
    if(!result.success){
        alert("google login failed");
    }
    else{
        saveLocalUser(result.user);
    }


    return result;
}

/* ---------------- Get Local User ---------------- */

export function getLocalStorageUser(): User | undefined {
    const auth = localStorage.getItem("auth");

    if (!auth) {
        return undefined;
    }

    try {
        const parsed = JSON.parse(auth);

        if (Date.now() > parsed.expiresAt) {
            localStorage.removeItem("auth");
            return undefined;
        }

        return parsed.user as User;
    } catch {
        localStorage.removeItem("auth");
        return undefined;
    }
}

export async function getLocalStorageUserServer(): Promise<User | undefined> {
    const auth = localStorage.getItem("auth");

    if (!auth) {
        return undefined;
    }

    try {
        const user = await getMe();
        if(user == undefined){
            return undefined;
        }
        else{
            return user.user;
        }
    } catch {
        localStorage.removeItem("auth");
        return undefined;
    }
}