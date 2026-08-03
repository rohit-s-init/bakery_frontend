import {
    ApiResponse,
    ChatMessageRequest,
    ChatMessageResponse,
    ChatHistoryResponse,
    ChatMessage
} from "@/types/ai.interface";

// const BASE_URL = "http://localhost:9000/api/bot";
const BASE_URL = "https://bakery-backend-1-ltml.onrender.com/api/bot";

/* ---------------- Send Message ---------------- */

export async function sendMessage(
    data: ChatMessageRequest
): Promise<ChatMessageResponse> {
    const response = await fetch(`${BASE_URL}/insertmessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    return response.json();
}

/* ---------------- Get Conversation ---------------- */

export async function getConversation(): Promise<ChatHistoryResponse> {
    const response = await fetch(`${BASE_URL}/allmessages`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}