"use client";

import {
	CheckIcon,
	ChevronDownIcon,
	Loader2Icon,
	SearchIcon,
	XIcon,
} from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useFetchData from "@/hooks/use-fetch-data";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type {
	AnatomicalArea,
	AnatomicalAreasResponse,
} from "@/types/anatomical-areas";

export interface ServiceInfiniteSelectProps {
	value?: number | string;
	onChange: (value?: number | string, item?: AnatomicalArea) => void;
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
	const [isOpen, setIsOpen] = React.useState(false);
	const [hasOpened, setHasOpened] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	// Fetch anatomical areas ONLY when the user opens the list
	const { data: apiResponse, isLoading } =
		useFetchData<AnatomicalAreasResponse>({
			route: "/anatomical-areas",
			enabled: isOpen || hasOpened,
		});

	const areas = apiResponse?.data ?? [];

	// Local filtering by search query
	const filteredAreas = React.useMemo(() => {
		if (!searchQuery.trim()) return areas;
		const q = searchQuery.toLowerCase().trim();
		return areas?.filter((area) => area.name.toLowerCase().includes(q));
	}, [areas, searchQuery]);

	// Find currently selected area by ID
	const selectedArea = React.useMemo(() => {
		if (value === undefined || value === null || value === "") return undefined;
		return areas.find((a) => String(a.id) === String(value));
	}, [value, areas]);

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
		if (open) {
			setHasOpened(true);
		} else {
			setSearchQuery("");
		}
	};

	const handleSelect = (area?: AnatomicalArea) => {
		onChange(area?.id, area);
		handleOpenChange(false);
	};

	const displayPlaceholder =
		placeholder ?? t("consultation.servicePlaceholder");

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-8 md:h-9 xl:h-11 w-full items-center justify-between rounded-xl border border-input bg-input/30 px-3.5 py-2 text-start font-sans small outline-none transition-colors",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						"disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
				>
					<div className="flex items-center gap-2 min-w-0 flex-1">
						{selectedArea ? (
							<span className="truncate font-medium text-foreground">
								{selectedArea.name}
							</span>
						) : (
							<span className="truncate text-muted-foreground">
								{displayPlaceholder}
							</span>
						)}
					</div>

					<div className="flex items-center gap-1.5 shrink-0 ms-2">
						{selectedArea && !disabled && (
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
				{/* Search Box */}
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

				{/* Anatomical Areas List */}
				<div
					role="listbox"
					className="max-h-60 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 pe-1"
				>
					{/* Loading State */}
					{isLoading && areas.length === 0 && (
						<div className="py-6 flex items-center justify-center gap-2 small text-muted-foreground">
							<Loader2Icon className="size-4 animate-spin text-primary" />
							<span>{t("consultation.loadingServices")}</span>
						</div>
					)}

					{/* Empty State */}
					{!isLoading && filteredAreas.length === 0 && (
						<div className="py-6 text-center small text-muted-foreground">
							{t("consultation.noServiceFound")}
						</div>
					)}

					{/* Area Items */}
					{filteredAreas.map((area: AnatomicalArea) => {
						const isSelected = String(area.id) === String(value);

						return (
							<button
								key={area.id}
								type="button"
								role="option"
								aria-selected={isSelected}
								onClick={() => handleSelect(area)}
								className={cn(
									"flex w-full items-center justify-between px-2.5 py-2 rounded-lg small font-sans text-start transition-colors cursor-pointer",
									isSelected
										? "bg-primary/10 text-primary font-medium"
										: "text-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								<span className="truncate font-medium">{area.name}</span>

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

export const AnatomicalAreaSelect = ServiceInfiniteSelect;
export default ServiceInfiniteSelect;
