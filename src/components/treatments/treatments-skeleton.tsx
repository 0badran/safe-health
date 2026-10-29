import { Skeleton } from "@/components/ui/skeleton";

export function TreatmentsSkeleton({ count = 4 }: { count?: number }) {
	return (
		<div className="space-y-4 divide-y divide-border/60">
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="py-6 flex items-center justify-between gap-4">
					<div className="flex items-center gap-4 sm:gap-6 flex-1">
						<Skeleton className="h-8 w-10 rounded-lg" />
						<Skeleton className="h-8 w-48 sm:w-72 rounded-lg" />
					</div>
					<Skeleton className="size-9 rounded-full shrink-0" />
				</div>
			))}
		</div>
	);
}

export default TreatmentsSkeleton;
