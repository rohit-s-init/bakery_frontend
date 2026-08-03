import { AddOrderRequest, ApiResponse, GetOrdersResponse } from "@/types/orderdao.interface";


const BASE_URL = "https://bakery-backend-1-ltml.onrender.com/api/order";
// const BASE_URL = "http://localhost:9000/api/order";


/* ---------------- Add Order ---------------- */

export async function addOrder(
    data: AddOrderRequest
): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    return response.json();
}

/* ---------------- Get User Orders ---------------- */

export async function getUserOrders(): Promise<GetOrdersResponse> {
    const response = await fetch(`${BASE_URL}/`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}