"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ListFilter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import useFetchData from "@/hooks/use-fetch-data";
import type { ApiResponse } from "@/types/api";

export interface DoctorsFilterProps {
	className?: string;
}

export function DoctorsFilter({ className }: DoctorsFilterProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [specialtiesOpened, setSpecialtiesOpened] = React.useState(false);
	const [titlesOpened, setTitlesOpened] = React.useState(false);

	const { data: specialtiesRes, isLoading: isSpecialtiesLoading } =
		useFetchData<ApiResponse<string[]>>({
			route: "/doctors/dropdowns/specialties",
			enabled: specialtiesOpened,
		});
	const { data: titlesRes, isLoading: isTitlesLoading } =
		useFetchData<ApiResponse<string[]>>({
			route: "/doctors/dropdowns/titles",
			enabled: titlesOpened,
		});

	const specialties = specialtiesRes?.data ?? [];
	const titles = titlesRes?.data ?? [];

	const initialSearch = searchParams.get("search") || "";
	const initialSpecialty = searchParams.get("specialty") || "all";
	const initialTitle = searchParams.get("title") || "all";

	const [search, setSearch] = React.useState(initialSearch);
	const [specialty, setSpecialty] = React.useState(initialSpecialty);
	const [title, setTitle] = React.useState(initialTitle);

	// Synchronize when URL search params change externally
	const [prevSearchParams, setPrevSearchParams] = React.useState(
		searchParams.toString(),
	);
	const currentParamsString = searchParams.toString();
	if (currentParamsString !== prevSearchParams) {
		setPrevSearchParams(currentParamsString);
		setSearch(searchParams.get("search") || "");
		setSpecialty(searchParams.get("specialty") || "all");
		setTitle(searchParams.get("title") || "all");
	}

	const hasActiveFilters = Boolean(
		search.trim() ||
		(specialty && specialty !== "all") ||
		(title && title !== "all"),
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();

		if (search.trim()) {
			params.set("search", search.trim());
		}
		if (specialty && specialty !== "all") {
			params.set("specialty", specialty);
		}
		if (title && title !== "all") {
			params.set("title", title);
		}

		params.set("page", "1");
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleReset = () => {
		setSearch("");
		setSpecialty("all");
		setTitle("all");
		router.push(pathname, { scroll: false });
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className={cn(
				"w-full bg-purple-tint/50 dark:bg-muted/30 rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 lg:p-5 border border-white/15",
				className,
			)}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full bg-background rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3"
			>
				{/* Doctor Name Search Input */}
				<div className="flex-1 min-w-0">
					<Input
						variant="filter"
						placeholder={t("doctors.searchPlaceholder")}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* Specialty Dropdown */}
				<div className="w-full lg:w-60 xl:w-64 shrink-0">
					<Select
						value={specialty}
						onValueChange={setSpecialty}
						onOpenChange={(open) => {
							if (open) setSpecialtiesOpened(true);
						}}
					>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("doctors.allSpecialties")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{t("doctors.allSpecialties")}</SelectItem>
							{isSpecialtiesLoading && specialties.length === 0 ? (
								<div className="py-2 px-3 text-center small text-muted-foreground">
									{t("doctors.loading")}
								</div>
							) : (
								specialties.map((spec) => (
									<SelectItem key={spec} value={spec}>
										{spec}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				{/* Medical Title Dropdown */}
				<div className="w-full lg:w-60 xl:w-64 shrink-0">
					<Select
						value={title}
						onValueChange={setTitle}
						onOpenChange={(open) => {
							if (open) setTitlesOpened(true);
						}}
					>
						<SelectTrigger variant="filter">
							<SelectValue placeholder={t("doctors.allTitles")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{t("doctors.allTitles")}</SelectItem>
							{isTitlesLoading && titles.length === 0 ? (
								<div className="py-2 px-3 text-center small text-muted-foreground">
									{t("doctors.loading")}
								</div>
							) : (
								titles.map((docTitle) => (
									<SelectItem key={docTitle} value={docTitle}>
										{docTitle}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>

				{/* Filter Submit Button */}
				<Button className="min-w-36" type="submit">
					<ListFilter className="size-4" />
					<span>{t("doctors.filterButton")}</span>
				</Button>

				{/* Reset Button */}
				<AnimatePresence>
					{hasActiveFilters && (
						<motion.div
							initial={{ opacity: 0, scale: 0.85 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.85 }}
							transition={{ duration: 0.18 }}
						>
							<Button
								type="button"
								variant="ghost"
								onClick={handleReset}
								className="shrink-0"
							>
								<RotateCcw className="size-4" />
								<span>{t("doctors.resetButton")}</span>
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</motion.div>
	);
}

export default DoctorsFilter;
