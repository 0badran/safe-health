import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	partialPrefetching: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dashboard.safehealthme.cloud",
			},
		],
	},
	experimental: {
		agentUpgrade: "security",
	},
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	async redirects() {
		return [
			{
				source: "/:locale(ar|en|fr)/about",
				destination: "/:locale/about-us",
				permanent: true,
			},
			{
				source: "/:locale(ar|en|fr)/doctors",
				destination: "/:locale/our-doctors",
				permanent: true,
			},
			{
				source: "/:locale(ar|en|fr)/contact",
				destination: "/:locale/contact-us",
				permanent: true,
			},
			{
				source: "/:locale(ar|en|fr)/privacy",
				destination: "/:locale/privacy-policy",
				permanent: true,
			},
			{
				source: "/:locale(ar|en|fr)/terms",
				destination: "/:locale/terms-and-conditions",
				permanent: true,
			},
		];
	},
};

export default withNextIntl(nextConfig);
