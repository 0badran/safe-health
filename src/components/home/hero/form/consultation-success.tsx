import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, RotateCcwIcon } from "lucide-react";

interface ConsultationSuccessProps {
	onReset?: () => void;
	message?: string;
}

export function ConsultationSuccess({
	onReset,
	message = "Thank you! We'll be in touch soon.",
}: ConsultationSuccessProps) {
	return (
		<div className="relative py-12 px-4 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
			<div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
				<CheckCircle2Icon className="size-9 stroke-[2.2]" />
			</div>

			<div className="space-y-1.5 max-w-sm">
				<h3 className="h4 font-semibold text-primary font-heading">
					{message}
				</h3>
				<p className="small text-muted-foreground leading-relaxed font-sans">
					Our medical coordination team will review your details and reach out within 2 hours with available appointment times and options.
				</p>
			</div>

			{onReset && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onReset}
					className="mt-2 text-secondary hover:text-secondary"
				>
					<RotateCcwIcon className="size-3.5" />
					<span className="small">Submit another request</span>
				</Button>
			)}
		</div>
	);
}
