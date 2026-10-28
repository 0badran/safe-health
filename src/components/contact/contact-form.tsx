"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { CountrySelect } from "@/components/shared/country-select";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import useMutateData from "@/hooks/use-mutate-data";
import { formatCountryMultiLang, getCountryByCode } from "@/lib/countries";
import { useTranslation } from "@/lib/language-context";
import { useContactSchema, type ContactFormValues } from "@/schema/contact";

const DEFAULT_VALUES: ContactFormValues = {
	name: "",
	email: "",
	phone: "",
	country: "",
	message: "",
};

export function ContactForm() {
	const { t } = useTranslation();
	const contactSchema = useContactSchema();
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: DEFAULT_VALUES,
		mode: "onTouched",
	});

	const {
		mutateAsync,
		isPending: isLoading,
		isError,
		error,
		reset: resetMutation,
	} = useMutateData<unknown, ContactFormValues>({
		route: "/contact",
		onSuccess: () => {
			setIsSubmitted(true);
		},
	});

	const onSubmit = async (values: ContactFormValues) => {
		const countryObj = getCountryByCode(values.country);
		const formattedCountry = countryObj
			? formatCountryMultiLang(countryObj)
			: values.country;

		await mutateAsync({
			...values,
			country: formattedCountry,
		});
	};

	const handleReset = () => {
		form.reset(DEFAULT_VALUES);
		resetMutation();
		setIsSubmitted(false);
	};

	return (
		<Card className="py-0">
			<CardContent className="p-8 sm:p-10 space-y-6">
				{/* Header with SectionBadge & Title matching template */}
				<div className="space-y-3">
					<SectionBadge>{t("contact.form.badge")}</SectionBadge>

					<h2 className="font-heading h2 font-medium tracking-tight text-foreground">
						<span className="text-primary">{t("contact.form.titlePart1")}</span>{" "}
						{t("contact.form.titlePart2")}
					</h2>

					<p className="text-paragraph small leading-relaxed">
						{t("contact.form.description")}
					</p>
				</div>

				{isSubmitted ? (
					<div className="flex flex-col items-center justify-center text-center py-10 space-y-4 rounded-2xl bg-secondary/10 border border-border p-6">
						<div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
							<CheckCircle2Icon className="size-8" />
						</div>
						<div className="space-y-1">
							<h3 className="font-heading h5 font-medium text-foreground">
								{t("contact.form.successTitle")}
							</h3>
							<p className="small text-muted-foreground max-w-sm">
								{t("contact.form.successDesc")}
							</p>
						</div>
						<Button variant="outline" onClick={handleReset}>
							{t("contact.form.sendAnother")}
						</Button>
					</div>
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							noValidate
							className="space-y-4.5"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="space-y-1.5 text-start">
										<FormLabel className="small font-medium text-foreground">
											{t("contact.form.fullName")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isLoading}
												placeholder={t("contact.form.fullNamePlaceholder")}
												autoComplete="name"
											/>
										</FormControl>
										<FormMessage className="small" />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground">
												{t("contact.form.email")}{" "}
												<span className="text-destructive">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="email"
													disabled={isLoading}
													placeholder={t("contact.form.emailPlaceholder")}
													autoComplete="email"
												/>
											</FormControl>
											<FormMessage className="small" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="space-y-1.5 text-start">
											<FormLabel className="small font-medium text-foreground">
												{t("contact.form.phone")}{" "}
												<span className="text-destructive">*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="tel"
													disabled={isLoading}
													placeholder={t("contact.form.phonePlaceholder")}
													autoComplete="tel"
												/>
											</FormControl>
											<FormMessage className="small" />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem className="space-y-1.5 text-start">
										<FormLabel className="small font-medium text-foreground">
											{t("contact.form.country")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<CountrySelect
												value={field.value}
												onChange={field.onChange}
												disabled={isLoading}
												placeholder={t("contact.form.countryPlaceholder")}
											/>
										</FormControl>
										<FormMessage className="small" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem className="space-y-1.5 text-start">
										<FormLabel className="small font-medium text-foreground">
											{t("contact.form.message")}{" "}
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												rows={4}
												disabled={isLoading}
												placeholder={t("contact.form.messagePlaceholder")}
											/>
										</FormControl>
										<FormMessage className="small" />
									</FormItem>
								)}
							/>

							{isError && (
								<p className="small text-destructive font-medium text-start">
									{error?.message || t("contact.form.errorMessage")}
								</p>
							)}

							<Button
								type="submit"
								disabled={isLoading}
								withArrow={!isLoading}
								className="w-full"
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<span className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
										<span>{t("contact.form.sending")}</span>
									</div>
								) : (
									<span>{t("contact.form.sendNow")}</span>
								)}
							</Button>

							<p className="text-center small text-muted-foreground">
								{t("contact.form.privacyNote")}
							</p>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}
