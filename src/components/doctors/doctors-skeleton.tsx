import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DoctorCardSkeleton({ flip = false }: { flip?: boolean }) {
	return (
		<div className="w-full relative grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
			{/* Info Column */}
			<div
				className={cn(
					"w-full bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 global-shadow flex flex-col gap-6",
					"order-2 md:col-span-7",
					flip ? "md:order-2 items-start" : "md:order-1 md:items-end items-start",
				)}
			>
				{/* Pill Badge */}
				<Skeleton className="h-7 w-36 rounded-full" />

				{/* Doctor Name */}
				<Skeleton className="h-9 w-3/5 rounded-lg" />

				{/* Bio text lines */}
				<div
					className={cn(
						"space-y-2.5 w-full flex flex-col",
						flip ? "items-start" : "md:items-end items-start",
					)}
				>
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-4/5" />
				</div>

				{/* Specialties */}
				<div
					className={cn(
						"space-y-3 w-full flex flex-col",
						flip ? "items-start" : "md:items-end items-start",
					)}
				>
					<Skeleton className="h-4 w-32" />
					<div
						className={cn(
							"flex flex-wrap gap-2",
							flip ? "justify-start" : "md:justify-end justify-start",
						)}
					>
						<Skeleton className="h-8 w-24 rounded-full" />
						<Skeleton className="h-8 w-28 rounded-full" />
						<Skeleton className="h-8 w-20 rounded-full" />
						<Skeleton className="h-8 w-32 rounded-full" />
					</div>
				</div>

				{/* Button */}
				<Skeleton className="h-11 w-44 rounded-full" />
			</div>

			{/* Visual Column */}
			<div
				className={cn(
					"flex justify-center items-end relative pt-8 sm:pt-12",
					"order-1 md:col-span-5",
					flip ? "md:order-1" : "md:order-2",
				)}
			>
				<Skeleton className="h-80 sm:h-96 w-64 sm:w-72 rounded-t-full rounded-b-3xl" />
			</div>
		</div>
	);
}

export function DoctorsListSkeleton({ count = 3 }: { count?: number }) {
	return (
		<div className="flex flex-col gap-16 lg:gap-20">
			{Array.from({ length: count }).map((_, index) => (
				<DoctorCardSkeleton key={index} flip={index % 2 === 0} />
			))}
		</div>
	);
}

export default DoctorsListSkeleton;
