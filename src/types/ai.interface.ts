/* ---------------- Request ---------------- */

export interface ChatMessageRequest {
    content: string;
}

/* ---------------- Responses ---------------- */

export interface ChatMessageResponse {
    success: boolean;
    bot: AiResponse;
}

export interface ChatMessage {
    id: number;
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
}

export interface ChatHistoryResponse {
    success: boolean;
    messages: ChatMessage[];
}

/* ---------------- Generic ---------------- */

export interface ApiResponse {
    success: boolean;
    message?: string;
}

export type AiBehaviourPrediction =
    | "cake_enquiry"
    | "services_enquiry"
    | "about_us_enquiry"
    | "purchase_Intent_Detected"
    | "order_abandoned"
    | "complaint"
    | null;

export interface AiResponse{
    text: string,
    event: AiBehaviourPrediction
}