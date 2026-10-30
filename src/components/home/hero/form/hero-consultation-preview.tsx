"use client";

import * as React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";

import { ServiceInfiniteSelect } from "@/components/consultation/multi-step/service-infinite-select";
import { CountrySelect } from "@/components/shared/country-select";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMutateData from "@/hooks/use-mutate-data";
import { getCountryByCode } from "@/lib/countries";
import { useTranslation } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import {
	DEFAULT_HERO_CONSULTATION_VALUES,
	useHeroConsultationSchema,
	type HeroConsultationFormValues,
} from "@/schema/hero-consultation";
import { ConsultationSuccess } from "./consultation-success";

export interface HeroConsultationPreviewProps {
	className?: string;
	onSuccess?: () => void;
	onSubmit?: (data: HeroConsultationFormValues) => void | Promise<void>;
}

export function HeroConsultationPreview({
	className,
	onSuccess,
	onSubmit,
}: HeroConsultationPreviewProps) {
	const { t } = useTranslation();
	const locale = useLocale();
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const heroConsultationSchema = useHeroConsultationSchema();

	const form = useForm<HeroConsultationFormValues>({
		resolver: zodResolver(heroConsultationSchema),
		defaultValues: DEFAULT_HERO_CONSULTATION_VALUES,
		mode: "onTouched",
	});

	const {
		mutateAsync,
		isPending: isSubmitting,
		error: submitError,
		reset: resetMutation,
	} = useMutateData<unknown, FormData>({
		route: "/leads",
		onSuccess: () => {
			setIsSubmitted(true);
			onSuccess?.();
		},
	});

	const handleSubmit = async (data: HeroConsultationFormValues) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("phone", data.phone);
		formData.append("service_id", String(data.service_id));
		formData.append("treatment", data.treatment || String(data.service_id));

		if (data.country) {
			const countryObj = getCountryByCode(data.country);
			const formattedCountry = countryObj ? countryObj.name_en : data.country;
			formData.append("country", formattedCountry);
		}

		formData.append("privacy_policy_accepted", "1");
		formData.append("language", locale || "en");

		await mutateAsync(formData);
		if (onSubmit) {
			await onSubmit(data);
		}
	};

	const handleReset = () => {
		form.reset(DEFAULT_HERO_CONSULTATION_VALUES);
		resetMutation();
		setIsSubmitted(false);
	};

	return (
		<div
			className={cn(
				"relative z-20 w-full overflow-hidden bg-card text-card-foreground",
				className,
			)}
		>
			{/* Brand Watermark Decoration */}
			<Image
				src="/images/form-logo.png"
				alt=""
				width={200}
				height={200}
				className="absolute right-0 top-0 pointer-events-none opacity-85 w-auto h-auto"
			/>

			<div className="relative p-6 sm:p-8 flex flex-col gap-4 box-border">
				{/* Header */}
				<header className="space-y-1.5 text-start">
					<div className="flex items-center gap-1.5 text-primary small font-semibold tracking-wide uppercase">
						<SparklesIcon className="size-3.5" />
						<span>{t("navbar.getConsultation")}</span>
					</div>
					<h2 className="m-0 h3 leading-tight font-normal text-primary capitalize font-heading">
						{t("consultation.previewCardTitle")}
					</h2>
					<p className="mt-1 small md:leading-5.5 text-foreground/80 ">
						{t("consultation.previewCardSubtitle")}
					</p>
				</header>

				{isSubmitted ? (
					<ConsultationSuccess onReset={handleReset} />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							noValidate
							className="flex flex-col gap-3"
						>
							{/* Service Field */}
							<FormField
								control={form.control}
								name="service_id"
								render={({ field }) => (
									<FormItem className="space-y-1 text-start min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground  flex items-center gap-1 select-none">
											<span>{t("consultation.service")}</span>
											<span className="text-primary font-bold">*</span>
										</FormLabel>
										<FormControl>
											<ServiceInfiniteSelect
												value={field.value}
												selectedTitle={form.watch("treatment")}
												onChange={(serviceId, service) => {
													field.onChange(serviceId ?? "");
													if (service) {
														form.setValue("treatment", service.title);
													} else {
														form.setValue("treatment", "");
													}
												}}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage className="small text-destructive " />
									</FormItem>
								)}
							/>

							{/* Name + Phone Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="space-y-1 text-start min-w-0">
											<FormLabel className="small leading-5 font-medium text-foreground  flex items-center gap-1 select-none">
												<span>{t("consultation.fullName")}</span>
												<span className="text-primary font-bold">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													variant="filter"
													disabled={isSubmitting}
													placeholder={t("consultation.fullNamePlaceholder")}
													autoComplete="name"
													className="small"
												/>
											</FormControl>
											<FormMessage className="small text-destructive " />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="space-y-1 text-start min-w-0">
											<FormLabel className="small leading-5 font-medium text-foreground  flex items-center gap-1 select-none">
												<span>{t("consultation.phone")}</span>
												<span className="text-primary font-bold">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="tel"
													variant="filter"
													disabled={isSubmitting}
													placeholder={t("consultation.phonePlaceholder")}
													autoComplete="tel"
													onChange={(e) => {
														const val = e.target.value.replace(
															/[^0-9+\s\-()]/g,
															"",
														);
														field.onChange(val);
													}}
													className="small"
												/>
											</FormControl>
											<FormMessage className="small text-destructive " />
										</FormItem>
									)}
								/>
							</div>

							{/* Country Select */}
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="space-y-1 text-start min-w-0">
										<FormLabel className="small leading-5 font-medium text-foreground  flex items-center gap-1 select-none">
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
										<FormMessage className="small text-destructive " />
									</FormItem>
								)}
							/>

							{submitError && (
								<p className="small text-destructive font-medium text-start">
									{submitError.message || t("contact.form.errorMessage")}
								</p>
							)}

							{/* Action Button */}
							<div className="pt-2">
								<Button
									type="submit"
									variant="default"
									withArrow={!isSubmitting}
									disabled={isSubmitting}
									className="w-full gap-2"
								>
									{isSubmitting ? (
										<>
											<Loader2Icon className="size-4 animate-spin" />
											<span>{t("consultation.sending")}</span>
										</>
									) : (
										<>
											<CalendarIcon className="size-4" />
											<span>{t("consultation.previewCardCta")}</span>
										</>
									)}
								</Button>
							</div>
						</form>
					</Form>
				)}
			</div>
		</div>
	);
}

export default HeroConsultationPreview;
