"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useLocale } from "next-intl";

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
import { Textarea } from "@/components/ui/textarea";
import { CountrySelect } from "@/components/shared/country-select";
import { ConsultationSuccess } from "@/components/home/hero/form/consultation-success";
import useMutateData from "@/hooks/use-mutate-data";
import { getCountryByCode } from "@/lib/countries";
import { useLanguage, useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";

import { DoctorInfiniteSelect } from "./doctor-infinite-select";
import { ServiceInfiniteSelect } from "./service-infinite-select";
import { ImageUploader } from "./image-uploader";
import { StepperHeader } from "./stepper-header";
import {
	DEFAULT_MULTI_STEP_VALUES,
	useMultiStepConsultationSchema,
	type MultiStepFormValues,
} from "./schema";

export interface MultiStepConsultationFormProps {
	initialDoctorId?: number | string;
	initialServiceId?: number | string;
	initialTreatment?: string;
	onSuccess?: () => void;
	className?: string;
}

export function MultiStepConsultationForm({
	initialDoctorId,
	initialServiceId,
	initialTreatment,
	onSuccess,
	className,
}: MultiStepConsultationFormProps) {
	const { t } = useTranslation();
	const { isRtl } = useLanguage();
	const locale = useLocale();

	const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const multiStepSchema = useMultiStepConsultationSchema();

	const form = useForm<MultiStepFormValues>({
		resolver: zodResolver(multiStepSchema),
		defaultValues: {
			...DEFAULT_MULTI_STEP_VALUES,
			doctor_id: initialDoctorId,
			service_id: initialServiceId ?? initialTreatment ?? "",
			treatment: initialTreatment || "",
		},
		mode: "onTouched",
	});

	// API mutation to /leads
	const { mutateAsync, isPending: isSubmitting, error: submitError } = useMutateData<
		unknown,
		FormData
	>({
		route: "/leads",
		onSuccess: () => {
			setIsSubmitted(true);
			onSuccess?.();
		},
	});

	// Advance to next step after validating current step fields
	const handleNext = async () => {
		let isValid = false;

		if (currentStep === 1) {
			isValid = await form.trigger(["service_id", "doctor_id"]);
		} else if (currentStep === 2) {
			isValid = await form.trigger(["name", "email", "phone", "country"]);
		}

		if (isValid) {
			setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));
	};

	const handleSubmit = async (data: MultiStepFormValues) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("phone", data.phone);

		if (data.email) {
			formData.append("email", data.email);
		}

		// Exact key requested by user: service_id
		formData.append("service_id", String(data.service_id));
		// Required backend validator key: treatment (use service title if available, fallback to service_id)
		formData.append("treatment", data.treatment || String(data.service_id));

		if (data.doctor_id !== undefined && data.doctor_id !== null && data.doctor_id !== "") {
			formData.append("doctor_id", String(data.doctor_id));
		}

		if (data.country) {
			const countryObj = getCountryByCode(data.country);
			const formattedCountry = countryObj ? countryObj.name_en : data.country;
			formData.append("country", formattedCountry);
		}

		if (data.message) {
			formData.append("message", data.message);
		}

		formData.append("privacy_policy_accepted", "1");
		formData.append("language", locale || "en");

		if (data.images && data.images.length > 0) {
			data.images.forEach((file) => {
				formData.append("images[]", file);
			});
		}

		await mutateAsync(formData);
	};

	const handleReset = () => {
		form.reset({
			...DEFAULT_MULTI_STEP_VALUES,
			doctor_id: initialDoctorId,
			service_id: initialServiceId ?? initialTreatment ?? "",
			treatment: initialTreatment || "",
		});
		setCurrentStep(1);
		setIsSubmitted(false);
	};

	if (isSubmitted) {
		return <ConsultationSuccess onReset={handleReset} />;
	}

	return (
		<div className={cn("w-full space-y-6 p-4 sm:p-6", className)}>
			{/* Stepper Header */}
			<StepperHeader currentStep={currentStep} />

			{/* Form Form & Controls */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					noValidate
					className="space-y-5"
				>
					<AnimatePresence mode="wait">
						{/* STEP 1: Treatment & Specialist */}
						{currentStep === 1 && (
							<motion.div
								key="step-1"
								initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className="space-y-4"
							>
								{/* Service Infinite Selector */}
								<FormField
									control={form.control}
									name="service_id"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground flex items-center gap-1 select-none">
												<span>{t("consultation.service")}</span>
												<span className="text-primary font-bold">*</span>
											</FormLabel>
											<FormControl>
												<ServiceInfiniteSelect
													value={field.value}
													onChange={(serviceId, service) => {
														field.onChange(serviceId ?? "");
														if (service) {
															form.setValue("treatment", service.title);
														}
													}}
													disabled={isSubmitting}
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>

								{/* Doctor Infinite Selector */}
								<FormField
									control={form.control}
									name="doctor_id"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground select-none">
												{t("consultation.doctor")}
											</FormLabel>
											<FormControl>
												<DoctorInfiniteSelect
													value={field.value}
													onChange={field.onChange}
													disabled={isSubmitting}
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>
							</motion.div>
						)}

						{/* STEP 2: Patient Details */}
						{currentStep === 2 && (
							<motion.div
								key="step-2"
								initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className="space-y-4"
							>
								{/* Full Name */}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground flex items-center gap-1 select-none">
												<span>{t("consultation.fullName")}</span>
												<span className="text-primary font-bold">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													disabled={isSubmitting}
													placeholder={t("consultation.fullNamePlaceholder")}
													autoComplete="name"
													className="h-10.5 rounded-xl small"
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>

								{/* Email and Phone Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-1.5 text-start">
												<FormLabel className="small font-medium text-foreground select-none">
													{t("consultation.email")}
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="email"
														disabled={isSubmitting}
														placeholder={t("consultation.emailPlaceholder")}
														autoComplete="email"
														className="h-10.5 rounded-xl small"
													/>
												</FormControl>
												<FormMessage className="small text-destructive font-sans" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem className="space-y-1.5 text-start">
												<FormLabel className="small font-medium text-foreground flex items-center gap-1 select-none">
													<span>{t("consultation.phone")}</span>
													<span className="text-primary font-bold">*</span>
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="tel"
														disabled={isSubmitting}
														placeholder={t("consultation.phonePlaceholder")}
														autoComplete="tel"
														onChange={(e) => {
															const val = e.target.value.replace(/[^0-9+\s\-()]/g, "");
															field.onChange(val);
														}}
														className="h-10.5 rounded-xl small"
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
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground flex items-center gap-1 select-none">
												<span>{t("consultation.country")}</span>
												<span className="text-primary font-bold">*</span>
											</FormLabel>
											<FormControl>
												<CountrySelect
													value={field.value}
													onChange={field.onChange}
													disabled={isSubmitting}
													placeholder={t("consultation.countryPlaceholder")}
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>
							</motion.div>
						)}

						{/* STEP 3: Details & Attachments */}
						{currentStep === 3 && (
							<motion.div
								key="step-3"
								initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
								transition={{ duration: 0.25, ease: "easeInOut" }}
								className="space-y-4"
							>
								{/* Notes Message */}
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground select-none">
												{t("consultation.message")}
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													disabled={isSubmitting}
													placeholder={t("consultation.messagePlaceholder")}
													rows={3}
													className="min-h-20 py-2.5 resize-none small"
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>

								{/* Case Photos Uploader */}
								<FormField
									control={form.control}
									name="images"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormControl>
												<ImageUploader
													files={field.value || []}
													onChange={field.onChange}
													disabled={isSubmitting}
													maxFiles={3}
												/>
											</FormControl>
											<FormMessage className="small text-destructive font-sans" />
										</FormItem>
									)}
								/>

								{/* Agreement Checkbox */}
								<FormField
									control={form.control}
									name="privacy_policy_accepted"
									render={({ field }) => (
										<FormItem className="pt-1">
											<label className="inline-flex items-start gap-2.5 py-1 cursor-pointer select-none">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={isSubmitting}
														className="mt-0.5"
													/>
												</FormControl>
												<span className="small leading-normal text-foreground font-sans">
													{t("consultation.agreement")}
												</span>
											</label>
											<FormMessage className="small text-destructive font-sans ps-7 animate-in fade-in" />
										</FormItem>
									)}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Submission Error Banner */}
					{submitError && (
						<p className="small text-destructive text-center py-1">
							{submitError.message || t("contact.form.errorMessage")}
						</p>
					)}

					{/* Stepper Navigation Buttons */}
					<div className="pt-2 flex items-center justify-between gap-3 border-t border-border/40">
						{currentStep > 1 ? (
							<Button
								type="button"
								variant="outline"
								onClick={handleBack}
								disabled={isSubmitting}
								className="gap-2"
							>
								{isRtl ? (
									<ArrowRightIcon className="size-4" />
								) : (
									<ArrowLeftIcon className="size-4" />
								)}
								<span>{t("consultation.back")}</span>
							</Button>
						) : (
							<div />
						)}

						{currentStep < 3 ? (
							<Button
								type="button"
								variant="default"
								onClick={handleNext}
								className="gap-2"
							>
								<span>{t("consultation.next")}</span>
								{isRtl ? (
									<ArrowLeftIcon className="size-4" />
								) : (
									<ArrowRightIcon className="size-4" />
								)}
							</Button>
						) : (
							<Button
								type="submit"
								variant="default"
								disabled={isSubmitting}
								className="gap-2 min-w-36"
							>
								{isSubmitting ? (
									<>
										<Loader2Icon className="size-4 animate-spin" />
										<span>{t("consultation.sending")}</span>
									</>
								) : (
									<span>{t("consultation.submit")}</span>
								)}
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}

export default MultiStepConsultationForm;

