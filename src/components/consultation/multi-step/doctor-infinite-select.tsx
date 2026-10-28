"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FallbackImage } from "@/components/shared/fallback-image";
import { fetchData } from "@/lib/api";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { DoctorItem, DoctorsApiResponse } from "@/types/doctors";

export interface DoctorInfiniteSelectProps {
	value?: number | string;
	onChange: (value?: number | string) => void;
	disabled?: boolean;
	className?: string;
}

export function DoctorInfiniteSelect({
	value,
	onChange,
	disabled = false,
	className,
}: DoctorInfiniteSelectProps) {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [debouncedQuery, setDebouncedQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const loadMoreRef = React.useRef<HTMLDivElement>(null);

	// Debounce search query by 300ms
	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery.trim());
		}, 300);
		return () => clearTimeout(handler);
	}, [searchQuery]);

	// Server-side infinite query for doctors
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["doctors-infinite-select", debouncedQuery],
		queryFn: ({ pageParam = 1 }) =>
			fetchData<DoctorsApiResponse>({
				route: "/doctors",
				params: {
					page: String(pageParam),
					search: debouncedQuery || undefined,
					per_page: 10,
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

	// Flatten all doctors across paginated responses
	const allDoctors = React.useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap((page) => page?.data ?? []);
	}, [data]);

	// Find currently selected doctor
	const selectedDoctor = React.useMemo(() => {
		if (!value) return undefined;
		return allDoctors.find((d) => String(d.id) === String(value));
	}, [value, allDoctors]);

	// Auto-trigger fetchNextPage when bottom sentinel is in view
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

	// Focus search on open
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

	const handleSelect = (doctorId?: number | string) => {
		onChange(doctorId);
		handleOpenChange(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-11 md:h-12 w-full items-center justify-between rounded-xl border border-input bg-card px-3.5 py-2 text-start font-sans small outline-none transition-colors",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
				>
					<div className="flex items-center gap-2.5 min-w-0">
						{selectedDoctor ? (
							<>
								<div className="size-7 rounded-full overflow-hidden bg-muted shrink-0 border border-border">
									<FallbackImage
										src={selectedDoctor.image}
										fallbackSrc="/images/avatar.svg"
										alt={selectedDoctor.name}
										width={28}
										height={28}
										className="size-full object-cover"
									/>
								</div>
								<div className="flex flex-col min-w-0">
									<span className="truncate font-medium text-foreground text-xs md:text-sm">
										{selectedDoctor.name}
									</span>
									<span className="truncate text-muted-foreground text-[11px] leading-tight">
										{selectedDoctor.title}
									</span>
								</div>
							</>
						) : (
							<div className="flex items-center gap-2 text-foreground">
								<span className="truncate small font-medium">
									{t("consultation.anyDoctor")}
								</span>
							</div>
						)}
					</div>

					<ChevronDownIcon
						className={cn(
							"size-4 shrink-0 text-muted-foreground transition-transform duration-200 ms-2",
							isOpen && "rotate-180",
						)}
					/>
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
						placeholder={t("consultation.searchDoctor")}
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

				{/* Doctors List with Infinite Scroll */}
				<div
					role="listbox"
					className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 pe-1"
				>
					{/* Option 1: Any Available Specialist */}
					<button
						type="button"
						role="option"
						aria-selected={!value}
						onClick={() => handleSelect(undefined)}
						className={cn(
							"flex w-full items-center justify-between px-2.5 py-2 rounded-lg small font-sans text-start transition-colors cursor-pointer",
							!value
								? "bg-primary/10 text-primary font-medium"
								: "text-foreground hover:bg-accent hover:text-accent-foreground",
						)}
					>
						<div className="flex items-center gap-2.5 min-w-0">
							<span className="truncate">{t("consultation.anyDoctor")}</span>
						</div>
						{!value && (
							<CheckIcon className="size-4 shrink-0 text-primary ms-2" />
						)}
					</button>

					{/* Loading Initial State */}
					{isLoading && allDoctors.length === 0 && (
						<div className="py-6 flex items-center justify-center gap-2 small text-muted-foreground">
							<Loader2Icon className="size-4 animate-spin text-primary" />
							<span>{t("consultation.loadingMore")}</span>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && allDoctors.length === 0 && (
						<div className="py-6 text-center small text-muted-foreground">
							{t("consultation.noDoctorFound")}
						</div>
					)}

					{/* Doctor Items */}
					{allDoctors.map((doc: DoctorItem) => {
						const isSelected = String(doc.id) === String(value);

						return (
							<button
								key={doc.id}
								type="button"
								role="option"
								aria-selected={isSelected}
								onClick={() => handleSelect(doc.id)}
								className={cn(
									"flex w-full items-center justify-between px-2.5 py-2 rounded-lg small font-sans text-start transition-colors cursor-pointer",
									isSelected
										? "bg-primary/10 text-primary font-medium"
										: "text-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								<div className="flex items-center gap-2.5 min-w-0">
									<div className="size-8 rounded-full overflow-hidden bg-muted shrink-0 border border-border">
										<FallbackImage
											src={doc.image}
											fallbackSrc="/images/avatar.svg"
											alt={doc.name}
											width={32}
											height={32}
											className="size-full object-cover"
										/>
									</div>
									<div className="flex flex-col min-w-0">
										<span className="truncate font-medium text-xs md:text-sm">
											{doc.name}
										</span>
										<span className="truncate text-muted-foreground text-[11px] leading-tight">
											{doc.title}
										</span>
									</div>
								</div>
								{isSelected && (
									<CheckIcon className="size-4 shrink-0 text-primary ms-2" />
								)}
							</button>
						);
					})}

					{/* Bottom Sentinel for Infinite Scroll */}
					<div ref={loadMoreRef} className="h-2 w-full" />

					{/* Fetching Next Page Indicator */}
					{isFetchingNextPage && (
						<div className="py-2 flex items-center justify-center gap-2 small text-muted-foreground">
							<Loader2Icon className="size-3.5 animate-spin text-primary" />
							<span className="text-xs">{t("consultation.loadingMore")}</span>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default DoctorInfiniteSelect;

