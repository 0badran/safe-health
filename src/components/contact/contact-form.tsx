"use client";

import { SectionBadge } from "@/components/shared/section-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2Icon, SendIcon } from "lucide-react";
import * as React from "react";

export function ContactForm() {
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulating response feedback
		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 800);
	};

	return (
		<Card className="border bg-card/70 backdrop-blur-xs shadow-lg py-0">
			<CardContent className="p-8 sm:p-10 space-y-6">
				{/* Header with SectionBadge & Title matching template */}
				<div className="space-y-3">
					<SectionBadge>تواصل معنا</SectionBadge>

					<h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
						<span className="text-primary">ابدأ محادثتك</span> معنا اليوم
					</h2>

					<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
						فريقنا الاستشاري متواجد للإجابة عن أسئلتك، توضيح تكاليف العمليات،
						وترتيب استشارة مجانية مع أفضل الجراحين المعتمدين.
					</p>
				</div>

				{isSubmitted ? (
					<div className="flex flex-col items-center justify-center text-center py-10 space-y-4 rounded-2xl bg-secondary/50 border p-6">
						<div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
							<CheckCircle2Icon className="size-8" />
						</div>
						<div className="space-y-1">
							<h3 className="font-heading text-lg font-bold text-foreground">
								تم استلام رسالتك بنجاح!
							</h3>
							<p className="text-xs text-muted-foreground max-w-sm">
								شكراً لتواصلك مع Safe Health. سيقوم أحد مستشارينا الطبيين
								بالتواصل معك خلال أقل من ساعتين.
							</p>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsSubmitted(false)}
							className="mt-2"
						>
							إرسال رسالة أخرى
						</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4.5">
						<div className="space-y-1.5 text-start">
							<label
								htmlFor="name"
								className="text-xs font-semibold text-foreground"
							>
								الاسم الكامل <span className="text-destructive">*</span>
							</label>
							<Input
								id="name"
								name="name"
								required
								placeholder="مثال: أحمد محمد"
								className="h-11 bg-background"
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="email"
								className="text-xs font-semibold text-foreground"
							>
								البريد الإلكتروني <span className="text-destructive">*</span>
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								required
								placeholder="example@domain.com"
								className="h-11 bg-background"
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="subject"
								className="text-xs font-semibold text-foreground"
							>
								موضوع الاستفسار أو التخصص الطبي
							</label>
							<Input
								id="subject"
								name="subject"
								placeholder="مثال: استشارة زراعة شعر / استفسار عن تكلفة عملية"
								className="h-11 bg-background"
							/>
						</div>

						<div className="space-y-1.5 text-start">
							<label
								htmlFor="message"
								className="text-xs font-semibold text-foreground"
							>
								تفاصيل الرسالة <span className="text-destructive">*</span>
							</label>
							<Textarea
								id="message"
								name="message"
								required
								rows={4}
								placeholder="اكتب هنا كافة استفساراتك أو تفاصيل حالتك الطبية لنتمكن من مساعدتك..."
								className="min-h-28 bg-background"
							/>
						</div>

						<Button
							type="submit"
							disabled={isLoading}
							size="lg"
							className="w-full h-12 text-sm font-bold shadow-md"
						>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<span className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
									<span>جاري الإرسال...</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<span>إرسال الرسالة الآن</span>
									<SendIcon className="size-4 rtl:rotate-180" />
								</div>
							)}
						</Button>

						<p className="text-center text-xs">
							بياناتك الطبية مشفرة ومحمية بخصوصية تامة 100%
						</p>
					</form>
				)}
			</CardContent>
		</Card>
	);
}
