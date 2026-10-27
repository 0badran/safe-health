"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchData, type FetchOptions } from "@/lib/api";

export interface UseFetchDataOptions<T = any>
	extends Partial<UseQueryOptions<T>>,
		Omit<FetchOptions, "lang"> {
	lang?: string;
}

export default function useFetchData<T = any>({
	route,
	queryKey,
	queryFn,
	headers,
	params,
	lang: explicitLang,
	next,
	cache,
	...options
}: UseFetchDataOptions<T>) {
	if (!route) {
		throw new Error("Route is required for fetching data.");
	}
	const { i18n } = useTranslation();
	const lang = explicitLang ?? i18n.resolvedLanguage ?? i18n.language ?? "en";
	const resolvedQueryKey = queryKey
		? [...queryKey, lang]
		: [route, params, headers, lang];

	return useQuery<T>({
		queryKey: resolvedQueryKey,
		queryFn:
			queryFn ??
			(() =>
				fetchData<T>({
					route,
					lang,
					params,
					headers,
					next,
					cache,
				})),
		...options,
	});
}
