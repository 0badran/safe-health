import { Skeleton } from "@/components/ui/skeleton";

export function BeforeAfterSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="bg-card rounded-3xl sm:rounded-4xl p-3.5 sm:p-4 border border-border/60 flex flex-col gap-4"
				>
					{/* Image Skeleton */}
					<Skeleton className="w-full aspect-4/3 rounded-2xl sm:rounded-3xl" />

					{/* Badge + Timeframe Skeleton */}
					<div className="flex items-center justify-between">
						<Skeleton className="h-6 w-24 rounded-full" />
					</div>

					{/* Title Skeleton */}
					<Skeleton className="h-6 w-4/5 rounded-lg" />

					{/* Description Skeleton */}
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-4 w-3/4 rounded" />
					</div>

					{/* Bottom Bar Skeleton */}
					<div className="mt-auto pt-1">
						<Skeleton className="h-9 w-full rounded-xl" />
					</div>
				</div>
			))}
		</div>
	);
}

export default BeforeAfterSkeleton;

