"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlusIcon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

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
	maxSizeMb = 5,
	disabled = false,
	className,
}: ImageUploaderProps) {
	const { t } = useTranslation();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [error, setError] = React.useState<string | null>(null);

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

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const selectedList = Array.from(e.target.files || []);
		if (!selectedList.length) return;

		// Enforce max files limit
		const availableSlots = maxFiles - files.length;
		if (availableSlots <= 0) {
			setError(t("consultation.imagesMaxError"));
			return;
		}

		const validFiles: File[] = [];
		for (const file of selectedList.slice(0, availableSlots)) {
			// Check file size (maxSizeMb in bytes)
			if (file.size > maxSizeMb * 1024 * 1024) {
				setError(`${file.name} is larger than ${maxSizeMb}MB.`);
				continue;
			}
			// Check mime type
			if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
				setError("Only JPG, PNG and WebP images are supported.");
				continue;
			}
			validFiles.push(file);
		}

		if (validFiles.length > 0) {
			onChange([...files, ...validFiles]);
		}

		// Reset file input value so same file can be re-selected if needed
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const handleRemove = (index: number) => {
		setError(null);
		const updated = files.filter((_, i) => i !== index);
		onChange(updated);
	};

	const canUploadMore = files.length < maxFiles && !disabled;

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
			{canUploadMore && (
				<div
					onClick={() => inputRef.current?.click()}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							inputRef.current?.click();
						}
					}}
					className={cn(
						"flex flex-col items-center justify-center p-4 border border-dashed border-input rounded-2xl bg-card hover:bg-accent/40 cursor-pointer transition-colors text-center select-none",
						"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none",
						disabled && "opacity-50 cursor-not-allowed pointer-events-none",
					)}
				>
					<div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
						<UploadCloudIcon className="size-5" />
					</div>
					<p className="small font-medium text-foreground">
						{t("consultation.imagesLabel")}
					</p>
					<p className="text-[11px] text-muted-foreground mt-0.5">
						{t("consultation.imagesHelp")}
					</p>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<p className="small text-destructive font-sans animate-in fade-in">
					{error}
				</p>
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
								className="absolute top-1.5 end-1.5 size-6 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center shadow-xs transition-colors cursor-pointer"
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
