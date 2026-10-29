import { Skeleton } from "@/components/ui/skeleton";

export function LegalSkeleton() {
	return (
		<main className="flex flex-col flex-1">
			{/* Header Skeleton */}
			<section className="relative overflow-hidden pt-24 lg:pt-32 pb-10 lg:pb-20">
				<div className="container relative z-10">
					<div className="flex flex-col items-center justify-center text-center gap-4">
						<Skeleton className="h-12 w-64 sm:w-80 rounded-2xl" />
						<Skeleton className="h-7 w-32 rounded-full" />
					</div>
				</div>
			</section>

			{/* Content Card Skeleton */}
			<div className="container pb-20">
				<div className="rounded-3xl sm:rounded-4xl border border-border bg-card p-6 sm:p-10 lg:p-14 space-y-6">
					<Skeleton className="h-6 w-full max-w-2xl rounded-md" />
					<Skeleton className="h-6 w-full max-w-xl rounded-md" />
					<div className="pt-4 space-y-3">
						<Skeleton className="h-8 w-48 rounded-lg" />
						<Skeleton className="h-5 w-full rounded-md" />
						<Skeleton className="h-5 w-5/6 rounded-md" />
						<Skeleton className="h-5 w-4/6 rounded-md" />
					</div>
					<div className="pt-4 space-y-3">
						<Skeleton className="h-8 w-56 rounded-lg" />
						<Skeleton className="h-5 w-full rounded-md" />
						<Skeleton className="h-5 w-3/4 rounded-md" />
					</div>
				</div>
			</div>
		</main>
	);
}

export default LegalSkeleton;

