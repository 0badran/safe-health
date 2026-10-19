"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";
import * as React from "react";

export interface BeforeAfterFilterValues {
	country: string;
	procedure: string;
	sort: string;
}

export interface BeforeAfterFilterProps {
	onFilter?: (filters: BeforeAfterFilterValues) => void;
	className?: string;
}

export function BeforeAfterFilter({
	onFilter,
	className,
}: BeforeAfterFilterProps) {
	const [country, setCountry] = React.useState("all");
	const [procedure, setProcedure] = React.useState("all");
	const [sort, setSort] = React.useState("newest");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFilter?.({
			country,
			procedure,
			sort,
		});
	};

	return (
		<div
			className={cn(
				"w-full bg-purple-tint/50 dark:bg-muted/30 rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 lg:p-5 border border-white/15",
				className,
			)}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full bg-background rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3"
			>
				{/* Country Selector */}
				<div className="flex-1 min-w-0">
					<Select value={country} onValueChange={setCountry}>
						<SelectTrigger variant="filter">
							<SelectValue placeholder="countries" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Countries</SelectItem>
							<SelectItem value="turkey">Turkey</SelectItem>
							<SelectItem value="egypt">Egypt</SelectItem>
							<SelectItem value="uae">United Arab Emirates</SelectItem>
							<SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
							<SelectItem value="uk">United Kingdom</SelectItem>
							<SelectItem value="germany">Germany</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Procedure Selector */}
				<div className="flex-1 min-w-0">
					<Select value={procedure} onValueChange={setProcedure}>
						<SelectTrigger variant="filter">
							<SelectValue placeholder="All Procedures" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Procedures</SelectItem>
							<SelectItem value="rhinoplasty">Rhinoplasty</SelectItem>
							<SelectItem value="deep-plane-facelift">
								Deep Plane Facelift
							</SelectItem>
							<SelectItem value="blepharoplasty">Blepharoplasty</SelectItem>
							<SelectItem value="breast-augmentation">
								Breast Augmentation
							</SelectItem>
							<SelectItem value="lip-enhancement">Lip Enhancement</SelectItem>
							<SelectItem value="full-facial-volumization">
								Full Facial Volumization
							</SelectItem>
							<SelectItem value="hair-transplant">Hair Transplant</SelectItem>
							<SelectItem value="dental-veneers">Dental Veneers</SelectItem>
							<SelectItem value="lasik">LASIK & Vision Correction</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Sort Order Selector */}
				<div className="flex-1 min-w-0">
					<Select value={sort} onValueChange={setSort}>
						<SelectTrigger variant="filter">
							<SelectValue placeholder="Newest First" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
							<SelectItem value="most-viewed">Most Viewed</SelectItem>
							<SelectItem value="highest-rated">Highest Rated</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Submit Button */}
				<Button className="min-w-36 lg:min-w-40" type="submit">
					<ListFilter className="size-4" />
					<span>Filter</span>
				</Button>
			</form>
		</div>
	);
}

export default BeforeAfterFilter;
