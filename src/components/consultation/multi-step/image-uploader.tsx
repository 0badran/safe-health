"use client";

import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { compressImage } from "@/lib/image-compression";
import { Loader2Icon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

export interface ImageUploaderProps {
	files: File[];
	onChange: (files: File[]) => void;
	maxFiles?: number;
	maxSizeMb?: number;
	disabled?: boolean;
	className?: string;
}

export function ImageUploader({
	files = [],
	onChange,
	maxFiles = 3,
	maxSizeMb = 1,
	disabled = false,
	className,
}: ImageUploaderProps) {
	const { t } = useTranslation();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [isProcessing, setIsProcessing] = React.useState(false);

	// Generate object URLs for previewing images
	const previewUrls = React.useMemo(() => {
		return files.map((file) => ({
			file,
			url: URL.createObjectURL(file),
		}));
	}, [files]);

	// Clean up object URLs when unmounting or changing files
	React.useEffect(() => {
		return () => {
			previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
		};
	}, [previewUrls]);

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const selectedList = Array.from(e.target.files || []);
		if (!selectedList.length) return;

		// Enforce max files limit
		const availableSlots = maxFiles - files.length;
		if (availableSlots <= 0) {
			setError(t("consultation.imagesMaxError"));
			return;
		}

		setIsProcessing(true);
		const validFiles: File[] = [];

		try {
			for (const rawFile of selectedList.slice(0, availableSlots)) {
				// Check mime type
				if (
					!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
						rawFile.type,
					)
				) {
					setError(t("consultation.imageTypeError"));
					continue;
				}

				// Automatically compress large photos client-side to ensure staying under server limit
				const processedFile = await compressImage(rawFile, 1600, 0.8);

				// Check file size (maxSizeMb in bytes)
				if (processedFile.size > maxSizeMb * 1024 * 1024) {
					setError(t("consultation.imageSizeError"));
					continue;
				}

				validFiles.push(processedFile);
			}

			if (validFiles.length > 0) {
				onChange([...files, ...validFiles]);
			}
		} finally {
			setIsProcessing(false);
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		}
	};

	const handleRemove = (index: number) => {
		setError(null);
		const updated = files.filter((_, i) => i !== index);
		onChange(updated);
	};

	const canUploadMore = files.length < maxFiles && !disabled && !isProcessing;

	return (
		<div className={cn("space-y-3", className)}>
			{/* Hidden file input */}
			<input
				ref={inputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp,image/jpg"
				multiple
				disabled={!canUploadMore}
				onChange={handleFileSelect}
				className="hidden"
			/>

			{/* Upload Dropzone / Trigger */}
			{files.length < maxFiles && (
				<div
					onClick={() => canUploadMore && inputRef.current?.click()}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if ((e.key === "Enter" || e.key === " ") && canUploadMore) {
							e.preventDefault();
							inputRef.current?.click();
						}
					}}
					className={cn(
						"flex flex-col items-center justify-center p-4 border border-dashed border-input rounded-2xl bg-card hover:bg-accent/40 cursor-pointer transition-colors text-center select-none",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none",
						(!canUploadMore || disabled) &&
							"opacity-50 cursor-not-allowed pointer-events-none",
					)}
				>
					<div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
						{isProcessing ? (
							<Loader2Icon className="size-5 animate-spin" />
						) : (
							<UploadCloudIcon className="size-5" />
						)}
					</div>
					<p className="small font-medium text-foreground">
						{isProcessing
							? t("consultation.sending")
							: t("consultation.imagesLabel")}
					</p>
					<p className="text-[11px] text-muted-foreground mt-0.5">
						{t("consultation.imagesHelp")}
					</p>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<p className="small text-destructive  animate-in fade-in">{error}</p>
			)}

			{/* Thumbnails Grid */}
			{previewUrls.length > 0 && (
				<div className="grid grid-cols-3 gap-3 pt-1">
					{previewUrls.map((item, index) => (
						<div
							key={item.url}
							className="relative group rounded-xl overflow-hidden border border-border bg-card aspect-square"
						>
							<Image
								src={item.url}
								alt={`Preview ${index + 1}`}
								fill
								className="object-cover"
							/>
							<button
								type="button"
								onClick={() => handleRemove(index)}
								className="absolute top-1.5 inset-e-1.5 size-6 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center shadow-xs transition-colors cursor-pointer"
								aria-label="Remove image"
							>
								<Trash2Icon className="size-3.5" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default ImageUploader;
