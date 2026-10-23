"use client";

import {
	useMutation,
	useQueryClient,
	type QueryKey,
	type UseMutationOptions,
} from "@tanstack/react-query";

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

	return useMutation<TData, Error, TVariables>({
		mutationFn:
			mutationFn ??
			(async (variables: TVariables) => {
				const isFormData =
					typeof FormData !== "undefined" && variables instanceof FormData;

				const headers: Record<string, string> = {
					"ngrok-skip-browser-warning": "true",
				};
				if (!isFormData && variables !== undefined) {
					headers["Content-Type"] = "application/json";
				}

				const baseUrl = url;
				const endpoint = `${baseUrl}${route}`;

				const res = await fetch(endpoint, {
					method,
					headers,
					body: isFormData
						? (variables as FormData)
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
