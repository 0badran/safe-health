"use client";

import * as React from "react";
import { CheckCircle2Icon } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/lib/language-context";

export function ContactForm() {
	const { t } = useTranslation();
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulating response feedback
		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 800);
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
						<Button
							variant="outline"
							onClick={() => setIsSubmitted(false)}
						>
							{t("contact.form.sendAnother")}
						</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4.5">
						<div className="space-y-1.5 text-start">
							<label
								htmlFor="name"
								className="small font-medium text-foreground"
							>
								{t("contact.form.fullName")}{" "}
								<span className="text-destructive">*</span>
							</label>
							<Input
								id="name"
								name="name"
								required
								placeholder={t("contact.form.fullNamePlaceholder")}
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="email"
								className="small font-medium text-foreground"
							>
								{t("contact.form.email")}{" "}
								<span className="text-destructive">*</span>
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								required
								placeholder={t("contact.form.emailPlaceholder")}
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="subject"
								className="small font-medium text-foreground"
							>
								{t("contact.form.subject")}
							</label>
							<Input
								id="subject"
								name="subject"
								placeholder={t("contact.form.subjectPlaceholder")}
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="message"
								className="small font-medium text-foreground"
							>
								{t("contact.form.message")}{" "}
								<span className="text-destructive">*</span>
							</label>
							<Textarea
								id="message"
								name="message"
								required
								rows={4}
								placeholder={t("contact.form.messagePlaceholder")}
							/>
						</div>

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
				)}
			</CardContent>
		</Card>
	);
}
