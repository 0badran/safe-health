import useFetchData from "@/hooks/use-fetch-data";
import type { SettingsApiResponse, SettingsData } from "@/types/settings";

export function useSettings(): {
	settings: SettingsData | undefined;
	isLoading: boolean;
	error: unknown;
} {
	const { data, isLoading, error } = useFetchData<SettingsApiResponse>({
		route: "/settings",
	});

	return {
		settings: data?.data,
		isLoading,
		error,
	};
}

export default useSettings;

