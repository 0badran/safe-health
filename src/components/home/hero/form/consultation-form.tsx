"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { COUNTRIES, DEFAULT_FORM_VALUES, INPUT_BASE_CLASSES } from "./constants";
import { ConsultationSuccess } from "./consultation-success";
import { DecorationWatermark } from "./decoration-watermark";
import {
	consultationFormSchema,
	type ConsultationFormValues,
} from "./schema";

export interface ConsultationFormProps {
	onSubmit?: (data: ConsultationFormValues) => void | Promise<void>;
	className?: string;
	title?: string;
	description?: string;
}

export function ConsultationForm({
	onSubmit,
	className,
	title = "Request A Consultation.",
	description = "Share your contact details and our team will discuss availability. Required fields are marked *.",
}: ConsultationFormProps) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ConsultationFormValues>({
		resolver: zodResolver(consultationFormSchema),
		defaultValues: DEFAULT_FORM_VALUES,
		mode: "onTouched",
	});

	const handleSubmit = async (data: ConsultationFormValues) => {
		setIsSubmitting(true);
		try {
			if (onSubmit) {
				await onSubmit(data);
			}
			setIsSubmitted(true);
		} catch (error) {
			console.error("Consultation form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReset = () => {
		form.reset(DEFAULT_FORM_VALUES);
		setIsSubmitted(false);
	};

	return (
		<div
			className={cn(
				"relative w-full max-w-137.5 mx-auto bg-white rounded-2xl overflow-hidden",
				"lg:shadow-[0_8px_30px_rgba(57,37,121,0.16)] border border-primary/10",
				className,
			)}
		>
			<DecorationWatermark />

			<div className="relative p-6 sm:p-8 flex flex-col gap-4 box-border">
				<header className="space-y-1.5">
					<h2 className="m-0 text-[clamp(20px,4.4vw,26px)] leading-tight font-normal text-primary capitalize font-heading">
						{title}
					</h2>
					<p className="m-0 text-[14px] leading-5.5 text-[#282331]/80 font-sans">
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
								render={({ field, fieldState }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="text-[14px] leading-5 font-medium text-[#282331] font-sans flex items-center gap-1 select-none">
											<span>Full name</span>
											<span className="text-primary font-bold" aria-hidden="true">
												*
											</span>
										</FormLabel>
										<FormControl>
											<input
												{...field}
												type="text"
												disabled={isSubmitting}
												placeholder="Alex Morgan"
												autoComplete="name"
												spellCheck={false}
												className={cn(
													INPUT_BASE_CLASSES,
													"h-10.5",
													fieldState.error &&
													"shadow-[inset_0_0_0_1px_#dc2626] focus:shadow-[inset_0_0_0_2px_#dc2626]",
												)}
											/>
										</FormControl>
										<FormMessage className="text-[12px] text-red-600 font-sans animate-in fade-in slide-in-from-top-1 duration-150" />
									</FormItem>
								)}
							/>

							{/* Email + Phone Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<FormItem className="gap-1.5 min-w-0">
											<FormLabel className="text-[14px] leading-5 font-medium text-[#282331] font-sans flex items-center gap-1 select-none">
												<span>Email address</span>
												<span className="text-primary font-bold" aria-hidden="true">
													*
												</span>
											</FormLabel>
											<FormControl>
												<input
													{...field}
													type="email"
													disabled={isSubmitting}
													placeholder="alex@example.com"
													autoComplete="email"
													spellCheck={false}
													className={cn(
														INPUT_BASE_CLASSES,
														"h-10.5",
														fieldState.error &&
														"shadow-[inset_0_0_0_1px_#dc2626] focus:shadow-[inset_0_0_0_2px_#dc2626]",
													)}
												/>
											</FormControl>
											<FormMessage className="text-[12px] text-red-600 font-sans animate-in fade-in slide-in-from-top-1 duration-150" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="gap-1.5 min-w-0">
											<FormLabel className="text-[14px] leading-5 font-medium text-[#282331] font-sans select-none">
												Phone
											</FormLabel>
											<FormControl>
												<input
													{...field}
													type="tel"
													disabled={isSubmitting}
													placeholder="+90 532 123 45 67"
													autoComplete="tel"
													className={cn(INPUT_BASE_CLASSES, "h-[42px]")}
												/>
											</FormControl>
											<FormMessage className="text-[12px] text-red-600 font-sans" />
										</FormItem>
									)}
								/>
							</div>

							{/* Country Select */}
							<FormField
								control={form.control}
								name="country"
								render={({ field, fieldState }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="text-[14px] leading-5 font-medium text-[#282331] font-sans select-none">
											Country
										</FormLabel>
										<div className="relative">
											<FormControl>
												<select
													{...field}
													disabled={isSubmitting}
													className={cn(
														INPUT_BASE_CLASSES,
														"h-[42px] appearance-none pr-9 cursor-pointer",
														!field.value && "text-[#868588]",
														fieldState.error &&
														"shadow-[inset_0_0_0_1px_#dc2626] focus:shadow-[inset_0_0_0_2px_#dc2626]",
													)}
												>
													<option value="" className="text-[#868588]">
														Which country are you from?
													</option>
													{COUNTRIES.map((c) => (
														<option key={c} value={c} className="text-[#282331]">
															{c}
														</option>
													))}
												</select>
											</FormControl>
											<svg
												className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3.5"
												width="12"
												height="6"
												viewBox="0 0 12 6"
												aria-hidden="true"
											>
												<path
													d="M0 0L6 6L12 0"
													fill="none"
													stroke="#086972"
													strokeWidth="1.5"
													strokeLinecap="round"
												/>
											</svg>
										</div>
										<FormMessage className="text-[12px] text-red-600 font-sans" />
									</FormItem>
								)}
							/>

							{/* Message */}
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="text-[14px] leading-5 font-medium text-[#282331] font-sans select-none">
											message
										</FormLabel>
										<FormControl>
											<textarea
												{...field}
												disabled={isSubmitting}
												placeholder="Tell us about the treatment you are considering."
												rows={3}
												className={cn(
													INPUT_BASE_CLASSES,
													"py-3 leading-6 resize-none",
												)}
											/>
										</FormControl>
										<FormMessage className="text-[12px] text-red-600 font-sans" />
									</FormItem>
								)}
							/>

							{/* Agreement Checkbox */}
							<FormField
								control={form.control}
								name="agree"
								render={({ field, fieldState }) => (
									<FormItem className="gap-1">
										<label className="inline-flex items-center gap-3 py-1 cursor-pointer select-none">
											<FormControl>
												<input
													type="checkbox"
													checked={field.value}
													onChange={field.onChange}
													disabled={isSubmitting}
													className="peer sr-only border"
												/>
											</FormControl>
											<span
												className={cn(
													"flex-none size-5 rounded bg-white flex items-center justify-center transition-all duration-200",
													"shadow-[inset_0_0_0_1pxprimary peer-checked:bg-primary peer-checked:shadow-none",
													"peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-1",
													"[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
													fieldState.error && "shadow-[inset_0_0_0_1.5px_#dc2626]",
												)}
											>
												<svg
													width="12"
													height="9"
													viewBox="0 0 16 11"
													aria-hidden="true"
													className="transition-opacity duration-150"
												>
													<path
														d="M16 0L5 11L0 6"
														fill="none"
														stroke="#fff"
														strokeWidth="2.2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</span>
											<span className="text-[14px] leading-normal text-[#282331] font-sans">
												I agree to be contacted about this request.{" "}
												<span className="text-primary font-bold">*</span>
											</span>
										</label>
										<FormMessage className="text-[12px] text-red-600 font-sans ps-8 animate-in fade-in slide-in-from-top-1 duration-150" />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<div className="pt-1">
								<Button
									variant="default"
									withArrow
								>
									Send request
								</Button>
							</div>
						</form>
					</Form>
				)}
			</div>
		</div>
	);
}

export default ConsultationForm;
