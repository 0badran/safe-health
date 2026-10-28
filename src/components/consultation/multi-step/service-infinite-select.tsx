"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { useLocale } from "next-intl";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/lib/api";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { ServiceItem, ServicesApiResponse } from "@/types/services";

export interface ServiceInfiniteSelectProps {
	value?: number | string;
	onChange: (value?: number | string, service?: ServiceItem) => void;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

export function ServiceInfiniteSelect({
	value,
	onChange,
	disabled = false,
	className,
	placeholder,
}: ServiceInfiniteSelectProps) {
	const { t } = useTranslation();
	const locale = useLocale();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [debouncedQuery, setDebouncedQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const loadMoreRef = React.useRef<HTMLDivElement>(null);

	// Debounce search input by 300ms
	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery.trim());
		}, 300);
		return () => clearTimeout(handler);
	}, [searchQuery]);

	// Server-side infinite query for services
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["services-infinite-select", debouncedQuery, locale],
		queryFn: ({ pageParam = 1 }) =>
			fetchData<ServicesApiResponse>({
				route: "/services",
				params: {
					page: String(pageParam),
					search: debouncedQuery || undefined,
					per_page: 15,
				},
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const meta = lastPage?.pagination?.meta;
			if (!meta) return undefined;
			return meta.current_page < meta.last_page
				? meta.current_page + 1
				: undefined;
		},
	});

	// Flatten all services across paginated responses
	const allServices = React.useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap((page) => page?.data ?? []);
	}, [data]);

	// Find currently selected service by ID
	const selectedService = React.useMemo(() => {
		if (value === undefined || value === null || value === "") return undefined;
		return allServices.find((s) => String(s.id) === String(value));
	}, [value, allServices]);

	// Auto-trigger fetchNextPage when sentinel element comes into view
	React.useEffect(() => {
		if (!isOpen || !hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 },
		);

		const el = loadMoreRef.current;
		if (el) observer.observe(el);

		return () => {
			if (el) observer.unobserve(el);
		};
	}, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Focus search input on popover open
	React.useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				searchInputRef.current?.focus();
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setSearchQuery("");
		}
	};

	const handleSelect = (service?: ServiceItem) => {
		onChange(service?.id, service);
		handleOpenChange(false);
	};

	const displayPlaceholder = placeholder ?? t("consultation.servicePlaceholder");

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-9.5 md:h-10.5 w-full items-center justify-between rounded-xl border border-input bg-card px-3.5 py-2 text-start font-sans small outline-none transition-colors",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
				>
					<div className="flex items-center gap-2 min-w-0 flex-1">
						{selectedService ? (
							<span className="truncate font-medium text-foreground">
								{selectedService.title}
							</span>
						) : (
							<span className="truncate text-muted-foreground">
								{displayPlaceholder}
							</span>
						)}
					</div>

					<div className="flex items-center gap-1.5 shrink-0 ms-2">
						{selectedService && !disabled && (
							<span
								role="button"
								tabIndex={0}
								onClick={(e) => {
									e.stopPropagation();
									onChange(undefined, undefined);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.stopPropagation();
										onChange(undefined, undefined);
									}
								}}
								className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm transition-colors cursor-pointer"
								aria-label="Clear selection"
							>
								<XIcon className="size-3.5" />
							</span>
						)}
						<ChevronDownIcon
							className={cn(
								"size-4 text-muted-foreground transition-transform duration-200",
								isOpen && "rotate-180",
							)}
						/>
					</div>
				</button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				sideOffset={6}
				className="w-(--radix-popover-trigger-width) min-w-[280px] p-2 bg-popover text-popover-foreground border-border rounded-xl shadow-xl z-50"
			>
				{/* Search Box */}
				<div className="relative mb-2 flex items-center">
					<SearchIcon className="absolute start-2.5 size-4 text-muted-foreground pointer-events-none z-10" />
					<Input
						ref={searchInputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t("consultation.searchService")}
						className="h-8.5 rounded-lg bg-secondary/50 ps-8 pe-8 text-foreground placeholder:text-muted-foreground small border-input/50"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute end-2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm z-10 cursor-pointer"
							aria-label="Clear search"
						>
							<XIcon className="size-3.5" />
						</button>
					)}
				</div>

				{/* Services List with Infinite Scroll */}
				<div
					role="listbox"
					className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 pe-1"
				>
					{/* Loading Initial State */}
					{isLoading && allServices.length === 0 && (
						<div className="py-6 flex items-center justify-center gap-2 small text-muted-foreground">
							<Loader2Icon className="size-4 animate-spin text-primary" />
							<span>{t("consultation.loadingServices")}</span>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && allServices.length === 0 && (
						<div className="py-6 text-center small text-muted-foreground">
							{t("consultation.noServiceFound")}
						</div>
					)}

					{/* Service Items */}
					{allServices.map((service: ServiceItem) => {
						const isSelected = String(service.id) === String(value);

						return (
							<button
								key={service.id}
								type="button"
								role="option"
								aria-selected={isSelected}
								onClick={() => handleSelect(service)}
								className={cn(
									"flex w-full items-center justify-between px-2.5 py-2 rounded-lg small font-sans text-start transition-colors cursor-pointer",
									isSelected
										? "bg-primary/10 text-primary font-medium"
										: "text-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								<div className="flex flex-col min-w-0 pe-2">
									<span className="truncate font-medium">
										{service.title}
									</span>
									{service.description && (
										<span className="truncate text-muted-foreground text-[11px] leading-tight">
											{service.description}
										</span>
									)}
								</div>

								{isSelected && (
									<CheckIcon className="size-4 shrink-0 text-primary ms-2" />
								)}
							</button>
						);
					})}

					{/* Loading Next Page Sentinel */}
					<div ref={loadMoreRef} className="py-1">
						{isFetchingNextPage && (
							<div className="flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground">
								<Loader2Icon className="size-3.5 animate-spin text-primary" />
								<span>{t("consultation.loadingServices")}</span>
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default ServiceInfiniteSelect;
