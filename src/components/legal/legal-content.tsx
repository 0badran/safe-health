"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";

export interface LegalContentProps {
	title: string;
	content: string;
	badge?: string;
	className?: string;
}

export function LegalContent({
	title,
	content,
	badge,
	className,
}: LegalContentProps) {
	return (
		<main className="flex flex-col flex-1 overflow-x-clip">
			<PageHeader
				badge={badge || title}
				title={title}
			/>

			<div className="container pb-20">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
					className={cn(
						"w-full rounded-3xl sm:rounded-4xl border border-border bg-card p-6 sm:p-10 lg:p-14 shadow-sm",
						// Rich HTML typography styling matching project standards
						"[&_h2]:h4 [&_h2]:font-heading [&_h2]:font-medium [&_h2]:text-primary [&_h2]:mt-8 [&_h2]:mb-3 [&_h2:first-child]:mt-0",
						"[&_h3]:h5 [&_h3]:font-heading [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2",
						"[&_p]:text-paragraph [&_p]:leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0",
						"[&_ul]:list-disc [&_ul]:ps-5 [&_ul]:space-y-2 [&_ul]:mb-6",
						"[&_ol]:list-decimal [&_ol]:ps-5 [&_ol]:space-y-2 [&_ol]:mb-6",
						"[&_li]:text-paragraph [&_li]:leading-relaxed",
						"[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-80 [&_a]:transition-opacity",
						"[&_strong]:text-foreground [&_strong]:font-semibold",
						className,
					)}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>
		</main>
	);
}

export default LegalContent;

