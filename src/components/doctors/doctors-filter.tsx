"use client";

import * as React from "react";
import { ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DoctorsFilterProps {
	onFilter?: (filters: {
		search: string;
		specialty: string;
		procedure: string;
	}) => void;
}

export function DoctorsFilter({ onFilter }: DoctorsFilterProps) {
	const [search, setSearch] = React.useState("");
	const [specialty, setSpecialty] = React.useState("all");
	const [procedure, setProcedure] = React.useState("all");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFilter?.({ search, specialty, procedure });
	};

	return (
		<div className="w-full bg-purple-tint/50 dark:bg-muted/30 rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 lg:p-5 border border-white/15">
			<form
				onSubmit={handleSubmit}
				className="w-full bg-background rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3"
			>
				<div className="flex-1 min-w-0">
					<Input
						variant="filter"
						placeholder="Search doctor by name or technique"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="w-full lg:w-60 xl:w-64 shrink-0">
					<Select value={specialty} onValueChange={setSpecialty}>
						<SelectTrigger variant="filter">
							<SelectValue placeholder="All Specialties" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Specialties</SelectItem>
							<SelectItem value="dermatology">
								Dermatology & Aesthetics
							</SelectItem>
							<SelectItem value="plastic-surgery">Plastic Surgery</SelectItem>
							<SelectItem value="hair-restoration">Hair Restoration</SelectItem>
							<SelectItem value="dentistry">Aesthetic Dentistry</SelectItem>
							<SelectItem value="rhinoplasty">Rhinoplasty Surgery</SelectItem>
							<SelectItem value="bariatric">Bariatric Surgery</SelectItem>
							<SelectItem value="ophthalmology">
								Ophthalmology & Vision
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-full lg:w-60 xl:w-64 shrink-0">
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

				<Button className="min-w-50" type="submit">
					<ListFilter className="size-4" />
					<span>Filter Team</span>
				</Button>
			</form>
		</div>
	);
}
