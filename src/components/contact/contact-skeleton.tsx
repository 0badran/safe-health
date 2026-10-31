import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactCardsSkeleton() {
	return (
		<div className="flex flex-col gap-6">
			{/* Contact Cards Grid Skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className="py-0">
						<CardContent className="p-6 flex flex-col items-center text-center space-y-3">
							<Skeleton className="size-14 rounded-2xl" />
							<div className="space-y-1.5 w-full flex flex-col items-center">
								<Skeleton className="h-3.5 w-20" />
								<Skeleton className="h-5 w-36" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Interactive Location Map Skeleton */}
			<Skeleton className="aspect-16/10 w-full rounded-3xl" />
		</div>
	);
}

export function ContactFormSkeleton() {
	return (
		<Card className="py-0">
			<CardContent className="p-8 sm:p-10 space-y-6">
				{/* Header Skeleton */}
				<div className="space-y-3">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-8 w-2/3" />
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</div>
				</div>

				{/* Form Fields Skeleton */}
				<div className="space-y-4.5">
					{/* Name Field */}
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 xl:h-11 w-full rounded-4xl" />
					</div>

					{/* Email & Phone Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-10 xl:h-11 w-full rounded-4xl" />
						</div>
						<div className="space-y-1.5">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 xl:h-11 w-full rounded-4xl" />
						</div>
					</div>

					{/* Country Field */}
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-10 xl:h-11 w-full rounded-4xl" />
					</div>

					{/* Message Textarea */}
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-28 w-full rounded-xl" />
					</div>

					{/* Submit Button */}
					<Skeleton className="h-10 xl:h-11 w-full rounded-4xl" />

					{/* Privacy Note */}
					<div className="flex justify-center pt-1">
						<Skeleton className="h-3.5 w-64" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

