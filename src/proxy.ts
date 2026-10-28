import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const middleware = createMiddleware(routing);

export default middleware;

export function proxy(request: NextRequest) {
	return middleware(request);
}

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		"/",

		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		"/(ar|en|fr)/:path*",

		// Enable redirects that add missing locales
		// (e.g. `/pathnames` -> `/en/pathnames`)
		"/((?!api|_next|_vercel|.*\\..*).*)",
	],
};
