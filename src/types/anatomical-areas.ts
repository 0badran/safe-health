import type { ApiResponse } from "./api";

export interface AnatomicalArea {
	id: number;
	name: string;
}

export type AnatomicalAreasResponse = ApiResponse<AnatomicalArea[]>;

