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
import useMutateData from "@/hooks/use-mutate-data";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { COUNTRIES, DEFAULT_FORM_VALUES } from "./constants";
import { ConsultationSuccess } from "./consultation-success";
import { consultationFormSchema, type ConsultationFormValues } from "./schema";

export interface ConsultationFormProps {
	onSubmit?: (data: ConsultationFormValues) => void | Promise<void>;
	className?: string;
	title?: string;
	description?: string;
	brandName?: string;
	onSuccess?: () => void;
}

export function ConsultationForm({
	onSubmit,
	className,
	title,
	description,
	onSuccess,
}: ConsultationFormProps) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { mutateAsync, isPending: isSubmitting } = useMutateData({
		route: "/contact",
		onSuccess: () => {
			setIsSubmitted(true);
			onSuccess?.();
		},
	});
	const form = useForm<ConsultationFormValues>({
		resolver: zodResolver(consultationFormSchema),
		defaultValues: DEFAULT_FORM_VALUES,
		mode: "onTouched",
	});

	const handleSubmit = async (data: ConsultationFormValues) => {
		const payload = { ...data };
		delete (payload as { agree?: boolean }).agree;
		await mutateAsync(payload);
		if (onSubmit) {
			await onSubmit(data);
		}
	};

	const handleReset = () => {
		form.reset(DEFAULT_FORM_VALUES);
		setIsSubmitted(false);
	};

	return (
		<div
			className={cn(
				"relative z-20 w-full overflow-hidden bg-card text-card-foreground",
				className,
			)}
		>
			<Image
				src={"/images/form-logo.png"}
				alt=""
				width={200}
				height={200}
				className="absolute right-0 "
			/>
			<div className="relative p-6 sm:p-8 flex flex-col gap-4 box-border">
				<header className="space-y-1.5">
					<h2 className="m-0 h3 leading-tight font-normal text-primary capitalize font-heading">
						{title}
					</h2>
					<p className="mt-2 small md:leading-5.5 text-foreground/80 font-sans">
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
							className="flex flex-col gap-2 md:gap-4"
						>
							{/* Full Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground font-sans flex items-center gap-1 select-none ">
											<span>Full name</span>
											<span
												className="text-primary font-bold"
												aria-hidden="true"
											>
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
												className="h-9 md:h-10.5 rounded-xl bg-card border-input small"
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
												<span
													className="text-primary font-bold"
													aria-hidden="true"
												>
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
													className="h-9 md:h-10.5 rounded-xl bg-card border-input small"
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
													className="h-9 md:h-10.5 rounded-xl bg-card border-input small"
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
												<SelectTrigger className="h-9 md:h-10.5 rounded-xl bg-card border-input small">
													<SelectValue placeholder="Which country are you from?" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COUNTRIES.map((c) => (
													<SelectItem className="small" key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className="small text-destructive font-sans" />
									</FormItem>
								)}
							/>

							{/* Message */}
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem className="gap-1.5 min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground font-sans select-none	">
											Message
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												disabled={isSubmitting}
												placeholder="Tell us about the treatment you are considering."
												rows={3}
												className="min-h-24 rounded-xl bg-card border-input py-3 resize-none small"
											/>
										</FormControl>
										<FormMessage className="small text-destructive font-sans" />
									</FormItem>
								)}
							/>

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
							<div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4">
								<div className="w-full sm:w-auto">
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
		</div>
	);
}

export default ConsultationForm;
