"use client";

import * as React from "react";
import { MailIcon, ShieldCheckIcon, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBadge } from "@/components/shared/section-badge";

export function ArticlesNewsletter() {
	const [email, setEmail] = React.useState("");
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setIsSubmitted(true);
	};

	return (
		<section className="py-12 md:py-20 bg-background border-t">
			<div className="container max-w-5xl px-4 sm:px-6 lg:px-8">
				<Card className="border bg-card/80 backdrop-blur-xs shadow-lg overflow-hidden py-0">
					<CardContent className="p-8 sm:p-12 text-center space-y-6">
						<div className="flex flex-col items-center space-y-3">
							<SectionBadge>النشرة الطبية المعتمدة</SectionBadge>
							<h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-2xl">
								احصل على أحدث الدراسات والمقارنات الطبية في بريدك الإلكتروني
							</h2>
							<p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
								نقدم لك ملخصات دورية موثقة حول تقنيات العلاج في الخارج، مقارنات
								الأسعار، ودلائل التعافي المكتوبة بإشراف نخبة من كبار الجراحين.
							</p>
						</div>

						{isSubmitted ? (
							<div className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-muted/60 text-foreground border max-w-md mx-auto">
								<CheckCircle2Icon className="size-5 text-primary shrink-0" />
								<span className="text-xs sm:text-sm font-semibold">
									تم اشتراكك بنجاح! سنرسل لك أهم الأدلة الطبية قريباً.
								</span>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
							>
								<div className="relative w-full">
									<Input
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="أدخل بريدك الإلكتروني..."
										className="h-11 ps-10 pe-4 text-xs sm:text-sm"
									/>
									<MailIcon className="size-4 text-muted-foreground absolute inset-y-0 inset-s-3.5 my-auto pointer-events-none" />
								</div>
								<Button
									type="submit"
									variant="default"
									size="lg"
									className="w-full sm:w-auto shrink-0 h-11 px-6 font-semibold"
								>
									اشترك مجاناً
								</Button>
							</form>
						)}

						{/* Trust Badges */}
						<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs text-muted-foreground">
							<div className="flex items-center gap-1.5">
								<ShieldCheckIcon className="size-4 text-primary" />
								<span>محتوى سريري مدقق 100%</span>
							</div>
							<div className="flex items-center gap-1.5">
								<CheckCircle2Icon className="size-4 text-primary" />
								<span>بدون أي رسائل ترويجية أو إعلانات</span>
							</div>
							<div className="flex items-center gap-1.5">
								<CheckCircle2Icon className="size-4 text-primary" />
								<span>إلغاء الاشتراك متاح في أي وقت بنقرة واحدة</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
