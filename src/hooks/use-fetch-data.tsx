"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const url = process.env.NEXT_PUBLIC_API_URL;

export default function useFetchData<T = any>({
	route,
	queryKey,
	queryFn,
	headers,
	params,
	...options
}: Partial<UseQueryOptions<T>> & {
	route: string;
	headers?: Record<string, string>;
	params?: Record<string, string>;
}) {
	if (!route) {
		throw new Error("Route is required for fetching data.");
	}
	const { i18n } = useTranslation();
	const lang = i18n.resolvedLanguage ?? i18n.language ?? "en";
	const resolvedQueryKey = queryKey
		? [...queryKey, lang]
		: [route, params, headers, lang];
	return useQuery<T>({
		queryKey: resolvedQueryKey,
		queryFn:
			queryFn ??
			(async () => {
				const endpoint = `${url}${route}${params ? "?" + new URLSearchParams(params).toString() : ""}`;
				const res = await fetch(endpoint, {
					headers: {
						"Accept-Language": lang,
						...headers,
					},
				});
				if (!res.ok) {
					throw res;
				}
				return res.json();
			}),
		...options,
	});
}
