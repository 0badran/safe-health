import { Skeleton } from "@/components/ui/skeleton";

export function CaseDetailSkeleton() {
	return (
		<main className="flex flex-col flex-1">
			{/* Hero Skeleton */}
			<div className="py-20 sm:py-28 bg-background border-b border-border/40">
				<div className="container max-w-4xl space-y-4">
					<Skeleton className="h-6 w-36 rounded-md" />
					<Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl" />
				</div>
			</div>

			{/* Content Skeleton */}
			<div className="container max-w-4xl py-12 space-y-8">
				<div className="flex items-center gap-4">
					<Skeleton className="h-7 w-28 rounded-full" />
					<Skeleton className="h-7 w-32 rounded-lg" />
				</div>

				{/* Image Slider Skeleton */}
				<Skeleton className="w-full aspect-16/10 rounded-3xl" />

				{/* Details Card Skeleton */}
				<div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
					<Skeleton className="h-8 w-2/3 rounded-lg" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-4 w-4/5 rounded" />
					</div>
				</div>

				{/* CTA Skeleton */}
				<Skeleton className="h-32 w-full rounded-3xl" />
			</div>
		</main>
	);
}

export default CaseDetailSkeleton;

