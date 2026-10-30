"use client";

import * as React from "react";
import {
	CheckIcon,
	ChevronDownIcon,
	Loader2Icon,
	SearchIcon,
	XIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { ServiceItem, ServicesApiResponse } from "@/types/services";

export interface ServiceInfiniteSelectProps {
	value?: number | string;
	selectedTitle?: string;
	onChange: (value?: number | string, item?: ServiceItem) => void;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

export function ServiceInfiniteSelect({
	value,
	selectedTitle,
	onChange,
	disabled = false,
	className,
	placeholder,
}: ServiceInfiniteSelectProps) {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [debouncedQuery, setDebouncedQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	// Debounce search query by 300ms for backend search
	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery.trim());
		}, 300);
		return () => clearTimeout(handler);
	}, [searchQuery]);

	// Real client-side HTTP request via useFetchData with backend search
	const { data: apiResponse, isLoading } = useFetchData<ServicesApiResponse>({
		route: "/services",
		...(debouncedQuery
			? {
					params: {
						search: debouncedQuery,
					},
				}
			: undefined),
	});

	const services = React.useMemo(() => {
		return (apiResponse?.data ?? []).filter(
			(service) => service.is_active !== false,
		);
	}, [apiResponse]);

	// Find currently selected service by ID
	const selectedService = React.useMemo(() => {
		if (value === undefined || value === null || value === "") return undefined;
		return services.find((s) => String(s.id) === String(value));
	}, [value, services]);

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

	const displayPlaceholder =
		placeholder ?? t("consultation.servicePlaceholder");

	const currentDisplayTitle =
		selectedService?.title || selectedTitle || undefined;

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-8 md:h-9 xl:h-11 w-full items-center justify-between rounded-xl border border-input bg-input/30 px-3.5 py-2 text-start  small outline-none transition-colors",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
				>
					<div className="flex items-center gap-2 min-w-0 flex-1">
						{currentDisplayTitle ? (
							<span className="truncate font-medium text-foreground">
								{currentDisplayTitle}
							</span>
						) : (
							<span className="truncate text-muted-foreground">
								{displayPlaceholder}
							</span>
						)}
					</div>

					<div className="flex items-center gap-1.5 shrink-0 ms-2">
						{value && !disabled && (
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
				className="w-(--radix-popover-trigger-width) min-w-70 p-2 bg-popover text-popover-foreground border-border rounded-xl shadow-xl z-50"
			>
				{/* Search Box - triggers backend search via debouncedQuery */}
				<div className="relative mb-2 flex items-center">
					<SearchIcon className="absolute inset-s-2.5 size-4 text-muted-foreground pointer-events-none z-10" />
					<Input
						ref={searchInputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t("consultation.searchService")}
						className="rounded-lg ps-8 pe-8 small"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute inset-e-2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm z-10 cursor-pointer"
							aria-label="Clear search"
						>
							<XIcon className="size-3.5" />
						</button>
					)}
				</div>

				{/* Services List */}
				<div
					role="listbox"
					className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 pe-1"
				>
					{/* Loading State */}
					{isLoading && (
						<div className="py-6 flex items-center justify-center gap-2 small text-muted-foreground">
							<Loader2Icon className="size-4 animate-spin text-primary" />
							<span>{t("consultation.loadingServices")}</span>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && services.length === 0 && (
						<div className="py-6 text-center small text-muted-foreground">
							{t("consultation.noServiceFound")}
						</div>
					)}

					{/* Service Items from API */}
					{!isLoading &&
						services.map((service: ServiceItem) => {
							const isSelected = String(service.id) === String(value);

							return (
								<button
									key={service.id}
									type="button"
									role="option"
									aria-selected={isSelected}
									onClick={() => handleSelect(service)}
									className={cn(
										"flex w-full items-center justify-between px-2.5 py-2 rounded-lg small  text-start transition-colors cursor-pointer",
										isSelected
											? "bg-primary/10 text-primary font-medium"
											: "text-foreground hover:bg-accent hover:text-accent-foreground",
									)}
								>
									<div className="flex flex-col min-w-0 flex-1">
										<span className="truncate font-medium">
											{service.title}
										</span>
										{service.sub_services &&
											service.sub_services.length > 0 && (
												<span className="truncate text-muted-foreground text-[11px] leading-tight">
													{service.sub_services.slice(0, 3).join(" • ")}
												</span>
											)}
									</div>

									{isSelected && (
										<CheckIcon className="size-4 shrink-0 text-primary ms-2" />
									)}
								</button>
							);
						})}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default ServiceInfiniteSelect;
