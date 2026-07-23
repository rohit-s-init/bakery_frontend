export interface AddOrderRequest {
    quantity: number;
    totalAmount: number;
    productName: string;
    productDescription: string;
    phoneNo: string;
    address: string;
}

export interface Order {
    id: number;
    quantity: number;
    totalAmount: number;
    productName: string;
    productDescription: string;
    phoneNo: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetOrdersResponse {
    success: boolean;
    orders: Order[];
}

export interface ApiResponse {
    success: boolean;
    message: string;
}