import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ArticleCardSkeleton({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"h-full flex flex-col justify-between rounded-3xl bg-card p-4 sm:p-5 border",
				className,
			)}
		>
			<div>
				{/* Top row: author avatar, name, and date */}
				<div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
					<div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
						<Skeleton className="size-10 sm:size-11 rounded-full shrink-0" />
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="h-3 w-16 shrink-0" />
				</div>

				{/* Image placeholder */}
				<Skeleton className="aspect-16/10 w-full rounded-2xl mb-3.5 sm:mb-4" />

				{/* Title placeholder */}
				<Skeleton className="h-5 w-3/4 mb-3" />
			</div>

			{/* Bottom row: description and arrow button */}
			<div className="flex items-end justify-between gap-3 pt-2 mt-auto">
				<div className="space-y-2 flex-1">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-4/5" />
				</div>

				<Skeleton className="size-9 sm:size-10 rounded-full shrink-0" />
			</div>
		</div>
	);
}

export function ArticleCardSkeletonGrid({ count = 6 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: count }).map((_, i) => (
				<ArticleCardSkeleton key={i} />
			))}
		</div>
	);
}

export default ArticleCardSkeleton;
