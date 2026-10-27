"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslation } from "@/lib/language-context";
import {
	Pagination as PaginationRoot,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

function get_pages(current_page: number, last_page: number) {
	if (last_page <= 7) {
		return Array.from({ length: last_page }, (_, i) => i + 1);
	}
	if (current_page <= 4) {
		return [1, 2, 3, 4, 5, -1, last_page];
	}
	if (current_page >= last_page - 3) {
		return [1, -1, last_page - 4, last_page - 3, last_page - 2, last_page - 1, last_page];
	}
	return [1, -1, current_page - 1, current_page, current_page + 1, -1, last_page];
}

export default function AppPagination({ last_page }: { last_page: number }) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	if (!last_page || last_page <= 1) {
		return null;
	}

	const current_page = Number(searchParams.get("page")) || 1;

	const create_url = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(page));
		return `${pathname}?${params.toString()}`;
	};

	const go_to_page = (page: number) => {
		router.push(create_url(page), { scroll: false });
	};

	const pages = get_pages(current_page, last_page);

	return (
		<PaginationRoot className="my-6">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						text={t("pagination.previous")}
						href={current_page > 1 ? create_url(current_page - 1) : "#"}
						onClick={(e) => {
							e.preventDefault();
							if (current_page > 1) go_to_page(current_page - 1);
						}}
						aria-disabled={current_page <= 1}
						className={current_page <= 1 ? "pointer-events-none opacity-40 cursor-not-allowed" : ""}
					/>
				</PaginationItem>

				{pages.map((page, index) => {
					if (page === -1) {
						return (
							<PaginationItem key={`dots-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					return (
						<PaginationItem key={page}>
							<PaginationLink
								href={create_url(page)}
								onClick={(e) => {
									e.preventDefault();
									go_to_page(page);
								}}
								isActive={page === current_page}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						text={t("pagination.next")}
						href={current_page < last_page ? create_url(current_page + 1) : "#"}
						onClick={(e) => {
							e.preventDefault();
							if (current_page < last_page) go_to_page(current_page + 1);
						}}
						aria-disabled={current_page >= last_page}
						className={current_page >= last_page ? "pointer-events-none opacity-40 cursor-not-allowed" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
}

