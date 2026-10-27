import type { ApiResponse } from "./api";

export interface SettingsData {
	phone: string | null;
	email: string | null;
	address: string | null;
	whatsapp_url: string | null;
	facebook_url: string | null;
	instagram_url: string | null;
	google_maps_url: string | null;
	certificate_file_url: string | null;
	logo: string | null;
	favicon: string | null;
	footer_description: string | null;
	brand_name: string | null;
	footer_copyright: string | null;
	maintenance_mode: boolean;
}

export type SettingsApiResponse = ApiResponse<SettingsData>;

