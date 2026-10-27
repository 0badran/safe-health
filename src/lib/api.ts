export type {
	ApiResponse,
	PaginatedApiResponse,
	SingleApiResponse,
	Pagination,
	PaginationLinks,
	PaginationMeta,
	PaginationMetaLink,
	SeoData,
} from "@/types/api";

export { getSeoMetadata, fetchPageSeo } from "@/lib/seo";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOptions<TVariables = any> {
	route: string;
	lang?: string;
	params?: Record<string, string | number | boolean | undefined | null>;
	headers?: Record<string, string>;
	method?: HttpMethod;
	body?: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
}

export class ApiError extends Error {
	status: number;
	data?: any;

	constructor(message: string, status: number, data?: any) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function buildEndpoint(
	route: string,
	params?: Record<string, string | number | boolean | undefined | null>,
): string {
	const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

	if (!params) {
		return `${baseUrl}${normalizedRoute}`;
	}

	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.append(key, String(value));
		}
	}

	const queryString = searchParams.toString();
	return queryString
		? `${baseUrl}${normalizedRoute}?${queryString}`
		: `${baseUrl}${normalizedRoute}`;
}

async function resolveLang(explicitLang?: string): Promise<string> {
	if (explicitLang) {
		return explicitLang;
	}

	if (typeof window !== "undefined") {
		return document.documentElement.lang || "en";
	}

	try {
		const { getLocale } = await import("next-intl/server");
		return (await getLocale()) || "en";
	} catch {
		return "en";
	}
}

export async function fetchData<TData = any, TVariables = any>({
	route,
	lang,
	params,
	headers,
	method = "GET",
	body,
	next,
	cache,
}: FetchOptions<TVariables>): Promise<TData> {
	if (!route) {
		throw new Error("Route is required for fetching data.");
	}

	const resolvedLang = await resolveLang(lang);
	const endpoint = buildEndpoint(route, params);
	const isFormData =
		typeof FormData !== "undefined" && body instanceof FormData;

	const requestHeaders: Record<string, string> = {
		Accept: "application/json",
		"Accept-Language": resolvedLang,
		...headers,
	};

	if (!isFormData && body !== undefined && method !== "GET") {
		requestHeaders["Content-Type"] = "application/json";
	}

	const requestInit: RequestInit = {
		method,
		headers: requestHeaders,
		body: isFormData
			? (body as FormData)
			: body !== undefined && method !== "GET"
				? JSON.stringify(body)
				: undefined,
		cache,
		next,
	};

	const res = await fetch(endpoint, requestInit);

	if (!res.ok) {
		let errorData: any;
		try {
			errorData = await res.json();
		} catch {
			errorData = await res.text();
		}
		throw new ApiError(
			errorData?.message || `API request failed with status ${res.status}`,
			res.status,
			errorData,
		);
	}

	return (await res.json()) as TData;
}

export default fetchData;
