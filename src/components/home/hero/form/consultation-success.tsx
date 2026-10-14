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
			<div className="size-16 rounded-full bg-[#392579]/10 text-[#392579] flex items-center justify-center shadow-inner">
				<CheckCircle2Icon className="size-9 stroke-[2.2]" />
			</div>

			<div className="space-y-1.5 max-w-sm">
				<h3 className="text-[20px] font-semibold text-[#392579] font-sans">
					{message}
				</h3>
				<p className="text-[14px] text-[#282331]/75 leading-relaxed font-sans">
					Our medical coordination team will review your details and reach out within 2 hours with available appointment times and options.
				</p>
			</div>

			{onReset && (
				<button
					type="button"
					onClick={onReset}
					className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-[#086972] hover:text-[#064e54] underline-offset-4 hover:underline transition-colors cursor-pointer select-none"
				>
					<RotateCcwIcon className="size-3.5" />
					<span>Submit another request</span>
				</button>
			)}
		</div>
	);
}
