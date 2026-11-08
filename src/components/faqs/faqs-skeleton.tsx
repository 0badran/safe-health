import { Skeleton } from "@/components/ui/skeleton";

export function FaqsSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="flex w-full max-w-4xl mx-auto flex-col gap-4 sm:gap-5">
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="rounded-2xl bg-card p-4 sm:p-5 shadow-[0_1px_12px_0] shadow-primary/8"
				>
					<div className="flex items-center justify-between gap-4 sm:gap-6">
						<div className="flex items-center gap-4 sm:gap-6 flex-1">
							<Skeleton className="size-8 sm:w-10 rounded-lg shrink-0" />
							<Skeleton className="h-6 w-3/4 rounded-lg" />
						</div>
						<Skeleton className="size-6 rounded-full shrink-0" />
					</div>
				</div>
			))}
		</div>
	);
}

export default FaqsSkeleton;
