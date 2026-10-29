"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
	getCountryByCode,
	searchCountries,
	type Country,
} from "@/lib/countries";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export interface CountrySelectProps {
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	id?: string;
}

export function CountrySelect({
	value,
	onChange,
	disabled = false,
	placeholder,
	className,
	id,
}: CountrySelectProps) {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const selectedCountry = React.useMemo(() => getCountryByCode(value), [value]);

	const filteredCountries = React.useMemo(
		() => searchCountries(searchQuery),
		[searchQuery],
	);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setSearchQuery("");
		}
	};

	// Focus search input on open
	React.useEffect(() => {
		if (!isOpen) return;

		const timer = setTimeout(() => {
			searchInputRef.current?.focus();
		}, 50);
		return () => clearTimeout(timer);
	}, [isOpen]);

	const handleSelect = (country: Country) => {
		onChange?.(country.name_en);
		handleOpenChange(false);
	};

	const displayLabel = selectedCountry
		? selectedCountry.name_en
		: placeholder;

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<button
					id={id}
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-8 md:h-9 xl:h-11 w-full items-center justify-between rounded-xl border border-input bg-input/30 px-3.5 py-2 text-start font-sans small outline-none transition-colors",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
						"disabled:cursor-not-allowed disabled:opacity-50",
						!selectedCountry && "text-muted-foreground",
						selectedCountry && "text-foreground",
						className,
					)}
				>
					<span className="truncate">{displayLabel}</span>
					<ChevronDownIcon
						className={cn(
							"size-4 shrink-0 text-muted-foreground transition-transform duration-200",
							isOpen && "rotate-180",
						)}
					/>
				</button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				sideOffset={6}
				className="w-(--radix-popover-trigger-width) min-w-65 p-2 bg-popover text-popover-foreground border-border rounded-xl shadow-lg"
			>
				{/* Search Box */}
				<div className="relative mb-2 flex items-center">
					<SearchIcon className="absolute inset-s-2.5 size-4 text-muted-foreground pointer-events-none z-10" />
					<Input
						ref={searchInputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t("consultation.searchCountry")}
						className="rounded-lg small ps-8"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute inset-e-2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm z-10"
							aria-label="Clear search"
						>
							<XIcon className="size-3.5" />
						</button>
					)}
				</div>

				{/* Countries List */}
				<div
					role="listbox"
					className="max-h-56 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-muted-foreground/20"
				>
					{filteredCountries.length === 0 ? (
						<div className="py-6 text-center small text-muted-foreground">
							{t("consultation.noCountryFound")}
						</div>
					) : (
						filteredCountries.map((country) => {
							const isSelected =
								country.code === value ||
								country.name_en.toLowerCase() === value?.toLowerCase();

							return (
								<button
									key={country.code}
									type="button"
									role="option"
									aria-selected={isSelected}
									onClick={() => handleSelect(country)}
									className={cn(
										"flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg small font-sans text-start transition-colors cursor-pointer",
										isSelected
											? "bg-primary/10 text-primary font-medium"
											: "text-foreground hover:bg-accent hover:text-accent-foreground",
									)}
								>
									<span className="truncate">{country.name_en}</span>
									{isSelected && (
										<CheckIcon className="size-4 shrink-0 text-primary ms-2" />
									)}
								</button>
							);
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default CountrySelect;
