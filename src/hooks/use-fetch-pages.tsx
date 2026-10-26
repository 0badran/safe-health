"use client";

import useFetchData from "@/hooks/use-fetch-data";
import { type UseQueryOptions } from "@tanstack/react-query";

export interface UseFetchPagesOptions<T = any> extends Omit<
	Partial<UseQueryOptions<T>>,
	"queryKey"
> {
	slug: string;
	headers?: Record<string, string>;
}

export default function useFetchPages<T = any>(
	slugOrOptions: string | UseFetchPagesOptions<T>,
) {
	const options =
		typeof slugOrOptions === "string" ? { slug: slugOrOptions } : slugOrOptions;

	const { slug, ...queryOptions } = options;
	const route = `/pages/${slug}`;

	return useFetchData<T>({
		route,
		...queryOptions,
	});
}
