"use client";

import {
	useMutation,
	useQueryClient,
	type QueryKey,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { fetchData, type HttpMethod } from "@/lib/api";

export type { HttpMethod };

export interface MutateDataOptions<TData = any, TVariables = any> extends Omit<
	UseMutationOptions<TData, Error, TVariables>,
	"mutationFn"
> {
	route?: string;
	method?: HttpMethod;
	invalidateKeys?: (QueryKey | string)[];
	mutationFn?: (variables: TVariables) => Promise<TData>;
}

export default function useMutateData<TData = any, TVariables = any>({
	route,
	method = "POST",
	invalidateKeys,
	mutationFn,
	onSuccess,
	...options
}: MutateDataOptions<TData, TVariables> = {}) {
	const queryClient = useQueryClient();
	if (!route) throw new Error("Route is required for mutating data.");
	const locale = useLocale();
	const lang = locale ?? "en";

	return useMutation<TData, Error, TVariables>({
		mutationFn:
			mutationFn ??
			((variables: TVariables) =>
				fetchData<TData, TVariables>({
					route,
					method,
					body: variables,
					lang,
				})),
		onSuccess: async (...args) => {
			if (invalidateKeys && invalidateKeys.length > 0) {
				return queryClient.invalidateQueries({ queryKey: invalidateKeys });
			}

			if (onSuccess) {
				await onSuccess(...args);
			}
		},
		...options,
	});
}
