"use client";

import {
	useMutation,
	useQueryClient,
	type QueryKey,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const url = process.env.NEXT_PUBLIC_API_URL;

export type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

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
	const { i18n } = useTranslation();
	const lang = i18n.resolvedLanguage ?? i18n.language ?? "en";

	return useMutation<TData, Error, TVariables>({
		mutationFn:
			mutationFn ??
			(async (variables: TVariables) => {
				const isFormData =
					typeof FormData !== "undefined" && variables instanceof FormData;

				const headers: Record<string, string> = {
					"Accept-Language": lang,
				};
				if (!isFormData && variables !== undefined) {
					headers["Content-Type"] = "application/json";
				}

				const endpoint = `${url}${route}`;

				const res = await fetch(endpoint, {
					method,
					headers,
					body: isFormData
						? variables
						: variables !== undefined
							? JSON.stringify(variables)
							: undefined,
				});

				if (!res.ok) {
					throw res;
				}

				return res.json();
			}),
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
