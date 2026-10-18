"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	COUNTRIES,
	DEFAULT_FORM_VALUES,
	DOCTORS,
	TREATMENTS,
} from "./constants";
import { ConsultationSuccess } from "./consultation-success";
import {
	consultationFormSchema,
	type ConsultationFormValues,
} from "./schema";

export interface ConsultationFormProps {
	onSubmit?: (
		data: ConsultationFormValues,
		files?: File[],
	) => void | Promise<void>;
	className?: string;
	title?: string;
	description?: string;
	brandName?: string;
	/** Whether to show the new extended inputs (treatment, doctor preference, image upload). Defaults to false for hero section. */
	showExtraFields?: boolean;
	onSuccess?: () => void;
}

export function ConsultationForm({
	onSubmit,
	className,
	title = "Request A Consultation.",
	description = "Share your contact details and our team will discuss availability. Required fields are marked *.",
	brandName = "SafeHealth",
	showExtraFields = false,
	onSuccess,
}: ConsultationFormProps) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [dragOver, setDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<ConsultationFormValues>({
		resolver: zodResolver(consultationFormSchema),
		defaultValues: DEFAULT_FORM_VALUES,
		mode: "onTouched",
	});

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return;
		const validFiles = Array.from(files).filter(
			(file) =>
				(file.type === "image/jpeg" ||
					file.type === "image/png" ||
					file.type === "image/webp") &&
				file.size <= 5 * 1024 * 1024,
		);

		setSelectedFiles((prev) => {
			const combined = [...prev, ...validFiles];
			return combined.slice(0, 3);
		});
	};

	const handleRemoveFile = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		handleFileSelect(e.dataTransfer.files);
	};

	const handleSubmit = async (data: ConsultationFormValues) => {
		setIsSubmitting(true);
		try {
			if (onSubmit) {
				await onSubmit(data, selectedFiles);
			}
			setIsSubmitted(true);
			onSuccess?.();
		} catch (error) {
			console.error("Consultation form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReset = () => {
		form.reset(DEFAULT_FORM_VALUES);
		setSelectedFiles([]);
		setIsSubmitted(false);
	};

	return (
		<div className={cn("relative w-full overflow-hidden bg-card text-card-foreground", className)}>
			<Image src={"/images/form-logo.png"} alt="" width={200} height={200} className="absolute right-0 "/>
				<div className="relative p-6 sm:p-8 flex flex-col gap-4 box-border">
				<header className="space-y-1.5">
					<h2 className="m-0 text-[clamp(20px,4.4vw,26px)] leading-tight font-normal text-primary capitalize font-heading">
						{title}
					</h2>
					<p className="m-0 small leading-5.5 text-foreground/80 font-sans">
						{description}
					</p>
				</header>

				{isSubmitted ? (
					<ConsultationSuccess onReset={handleReset} />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							noValidate
							className="flex flex-col gap-4"
						>
							{/* Full Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1 select-none">
											<span>Full name</span>
											<span className="text-primary font-bold" aria-hidden="true">
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												disabled={isSubmitting}
												placeholder="Alex Morgan"
												autoComplete="name"
												className="h-10.5 rounded-xl bg-card border-input"
											/>
										</FormControl>
										<FormMessage className="small text-destructive font-sans animate-in fade-in slide-in-from-top-1 duration-150" />
									</FormItem>
								)}
							/>

							{/* Email + Phone Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="gap-1.5 min-w-0">
											<FormLabel className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1 select-none">
												<span>Email address</span>
												<span className="text-primary font-bold" aria-hidden="true">
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="email"
													disabled={isSubmitting}
													placeholder="alex@example.com"
													autoComplete="email"
													className="h-10.5 rounded-xl bg-card border-input"
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans animate-in fade-in slide-in-from-top-1 duration-150" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="gap-1.5 min-w-0">
											<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none">
												Phone / WhatsApp
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="tel"
													disabled={isSubmitting}
													placeholder="+90 532 123 45 67"
													autoComplete="tel"
													className="h-10.5 rounded-xl bg-card border-input"
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>
							</div>

							{/* Country Select */}
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none">
											Country
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isSubmitting}
										>
											<FormControl>
												<SelectTrigger className="h-10.5 rounded-xl bg-card border-input">
													<SelectValue placeholder="Which country are you from?" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COUNTRIES.map((c) => (
													<SelectItem key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className="small text-destructive font-sans" />
									</FormItem>
								)}
							/>

							{/* Interested Treatment & Doctor Preference Grid (Visible when showExtraFields is true) */}
							{showExtraFields && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
									<FormField
										control={form.control}
										name="treatment"
										render={({ field }) => (
											<FormItem className="gap-1.5 min-w-0">
												<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none">
													Interested treatment
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
													disabled={isSubmitting}
												>
													<FormControl>
														<SelectTrigger className="h-10.5 rounded-xl bg-card border-input">
															<SelectValue placeholder="Select a treatment" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{TREATMENTS.map((t) => (
															<SelectItem key={t} value={t}>
																{t}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage className="small text-destructive font-sans" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="doctor"
										render={({ field }) => (
											<FormItem className="gap-1.5 min-w-0">
												<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none">
													Doctor preference
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
													disabled={isSubmitting}
												>
													<FormControl>
														<SelectTrigger className="h-10.5 rounded-xl bg-card border-input">
															<SelectValue placeholder="Select a doctor (optional)" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{DOCTORS.map((d) => (
															<SelectItem key={d} value={d}>
																{d}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage className="small text-destructive font-sans" />
											</FormItem>
										)}
									/>
								</div>
							)}

							{/* Message */}
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none">
											Message
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												disabled={isSubmitting}
												placeholder="Tell us about the treatment you are considering."
												rows={3}
												className="min-h-24 rounded-xl bg-card border-input py-3 resize-none"
											/>
										</FormControl>
										<FormMessage className="small text-destructive font-sans" />
									</FormItem>
								)}
							/>

							{/* Optional Images Dropzone (Visible when showExtraFields is true) */}
							{showExtraFields && (
								<div className="space-y-2 animate-in fade-in duration-200">
									<div
										onDragOver={(e) => {
											e.preventDefault();
											setDragOver(true);
										}}
										onDragLeave={() => setDragOver(false)}
										onDrop={handleDrop}
										onClick={() => fileInputRef.current?.click()}
										className={cn(
											"relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border border-dashed border-input transition-colors cursor-pointer bg-card hover:bg-muted/30",
											dragOver && "border-primary bg-primary/5",
										)}
									>
										<input
											ref={fileInputRef}
											type="file"
											multiple
											accept="image/png,image/jpeg,image/webp"
											className="hidden"
											onChange={(e) => handleFileSelect(e.target.files)}
										/>
										<div className="size-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-1.5">
											<ImagePlus className="size-4.5" />
										</div>
										<p className="font-medium text-foreground small">
											Optional images
										</p>
										<p className="small text-muted-foreground text-center">
											Drag or select up to 3 JPG/PNG images. Each image can be max 5 MB.
										</p>
									</div>

									{/* Selected Files List */}
									{selectedFiles.length > 0 && (
										<div className="flex flex-wrap gap-2 pt-1">
											{selectedFiles.map((file, idx) => (
												<div
													key={file.name + idx}
													className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground small border border-border"
												>
													<span className="truncate max-w-36 font-medium">
														{file.name}
													</span>
													<span className="opacity-70">
														({(file.size / (1024 * 1024)).toFixed(1)} MB)
													</span>
													<button
														type="button"
														onClick={() => handleRemoveFile(idx)}
														className="text-muted-foreground hover:text-destructive transition-colors ml-1"
														aria-label="Remove image"
													>
														<X className="size-3.5" />
													</button>
												</div>
											))}
										</div>
									)}
								</div>
							)}

							{/* Agreement Checkbox */}
							<FormField
								control={form.control}
								name="agree"
								render={({ field }) => (
									<FormItem className="gap-1">
										<label className="inline-flex items-start gap-3 py-1 cursor-pointer select-none">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
													disabled={isSubmitting}
													className="mt-0.5"
												/>
											</FormControl>
											<span className="small leading-normal text-foreground font-sans">
												I agree to be contacted about this request. See our{" "}
												<Link
													href="/privacy"
													className="underline underline-offset-4 hover:text-primary transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													Privacy Policy
												</Link>
												. <span className="text-primary font-bold">*</span>
											</span>
										</label>
										<FormMessage className="small text-destructive font-sans ps-7 animate-in fade-in slide-in-from-top-1 duration-150" />
									</FormItem>
								)}
							/>

							{/* Submit Button & Info Footer */}
							<div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
								{showExtraFields && <p className="small text-muted-foreground text-center sm:text-start order-2 sm:order-1">
									Your request will be reviewed by a {brandName} patient coordinator.
								</p>}
								<div className="w-full sm:w-auto order-1 sm:order-2">
									<Button
										type="submit"
										variant="default"
										withArrow
										disabled={isSubmitting}
										className="w-full sm:w-auto"
									>
										{isSubmitting ? "Sending..." : "Send  request"}
									</Button>
								</div>
							</div>
						</form>
					</Form>
				)}
		</div>
		</div >
	);
}

export default ConsultationForm;
