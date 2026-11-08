import type { ApiResponse } from "./api";

export interface FaqItem {
	id: number;
	number: string;
	question: string;
	answer: string;
}

export type FaqsApiResponse = ApiResponse<FaqItem[]>;

