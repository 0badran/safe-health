"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	getCountryByCode,
	getLocalizedCountryName,
	searchCountries,
	type Country,
} from "@/lib/countries";
import { useTranslation } from "@/lib/language-context";
import { useLocale } from "next-intl";
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
	const locale = useLocale();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const selectedCountry = React.useMemo(
		() => getCountryByCode(value),
		[value],
	);

	const filteredCountries = React.useMemo(
		() => searchCountries(searchQuery, locale),
		[searchQuery, locale],
	);

	// Focus search input on open
	React.useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				searchInputRef.current?.focus();
			}, 50);
			return () => clearTimeout(timer);
		} else {
			setSearchQuery("");
		}
	}, [isOpen]);

	const handleSelect = (country: Country) => {
		onChange?.(country.code);
		setIsOpen(false);
		setSearchQuery("");
	};

	const displayLabel = selectedCountry
		? getLocalizedCountryName(selectedCountry, locale)
		: placeholder;

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button
					id={id}
					type="button"
					disabled={disabled}
					aria-expanded={isOpen}
					className={cn(
						"flex h-9 md:h-10.5 w-full items-center justify-between rounded-xl border border-input bg-card px-3.5 py-2 text-start font-sans small outline-none transition-colors",
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
				className="w-(--radix-popover-trigger-width) min-w-[260px] p-2 bg-popover text-popover-foreground border-border rounded-xl shadow-lg"
			>
				{/* Search Box */}
				<div className="relative mb-2 flex items-center">
					<SearchIcon className="absolute start-2.5 size-4 text-muted-foreground pointer-events-none" />
					<input
						ref={searchInputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t("consultation.searchCountry")}
						className="h-8.5 w-full rounded-lg bg-secondary/50 ps-8 pe-8 text-foreground placeholder:text-muted-foreground small outline-none focus:ring-1 focus:ring-ring border border-input/50"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute end-2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm"
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
							const isSelected = country.code === value;
							const localizedName = getLocalizedCountryName(country, locale);

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
									<span className="truncate">{localizedName}</span>
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
