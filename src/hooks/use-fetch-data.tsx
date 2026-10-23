"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

const url = process.env.NEXT_PUBLIC_API_URL;

export default function useFetchData<T = any>({
	route,
	queryKey,
	queryFn,
	headers,
	...options
}: Partial<UseQueryOptions<T>> & {
	route: string;
	headers?: Record<string, string>;
}) {
	if (!route) {
		throw new Error("Route is required for fetching data.");
	}

	const resolvedQueryKey = queryKey ?? [route];

	return useQuery<T>({
		queryKey: resolvedQueryKey,
		queryFn:
			queryFn ??
			(async () => {
				const baseUrl = url;
				const endpoint = `${baseUrl}${route}`;
				const res = await fetch(endpoint, {
					headers: {
						"ngrok-skip-browser-warning": "true",
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
