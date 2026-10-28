"use client";

import * as React from "react";
import type { SettingsData } from "@/types/settings";

export interface SettingsContextType {
	settings: SettingsData | undefined;
	isLoading: boolean;
	error: unknown;
}

const SettingsContext = React.createContext<SettingsContextType>({
	settings: undefined,
	isLoading: false,
	error: null,
});

export function SettingsProvider({
	children,
	initialSettings,
}: {
	children: React.ReactNode;
	initialSettings?: SettingsData | null;
}) {
	const value = React.useMemo<SettingsContextType>(
		() => ({
			settings: initialSettings ?? undefined,
			isLoading: false,
			error: null,
		}),
		[initialSettings],
	);

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings(): SettingsContextType {
	return React.useContext(SettingsContext);
}

export default useSettings;

