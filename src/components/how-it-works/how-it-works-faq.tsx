import { HelpCircleIcon } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksFaq() {
	const faqs = [
		{
			q: "هل استشارة Safe Health مجانية بالكامل؟",
			a: "نعم، كافة الاستشارات الأولية، دراسة التقارير الطبية، وتقديم عروض الأسعار والخطط العلاجية مجانية 100% دون أي التزام مالي.",
		},
		{
			q: "كيف تضمنون كفاءة وتراخيص الجراحين؟",
			a: "يخضع كل طبيب لفحص مستقل وصارم (SafeScore™) يشمل التراخيص المهنية، سنوات الخبرة، عدد العمليات الناجحة، وتقييمات المرضى الموثقة.",
		},
		{
			q: "هل الأسعار المعروضة نهائية وشاملة؟",
			a: "بكل تأكيد؛ نضمن شفافية الأسعار بنسبة 100%. العرض المقدم يشمل كافة تكاليف الإجراء الطبي والمنشأة دون أي مصاريف إضافية أو مفاجآت.",
		},
		{
			q: "كيف تتم متابعة حالتي بعد العملية الجراحية؟",
			a: "يرافقك فريق الرعاية الطبية في برنامج متابعة دوري مخصص، مع إمكانية التواصل المباشر مع استشاريك للاطمئنان على سير التعافي.",
		},
	];

	return (
		<section id="faq" className="py-16 md:py-24 bg-background">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center text-center space-y-3 mb-14 max-w-2xl mx-auto">
					<SectionBadge>الأسئلة الشائعة</SectionBadge>

					<h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-foreground">
						إجابات على <span className="text-primary">أكثر ما يشغل بالك</span>
					</h2>

					<p className="text-sm text-muted-foreground leading-relaxed">
						جمعنا لك أهم التساؤلات الشائعة حول آلية عمل المنظومة وكيف نضمن لك
						أعلى مستويات الأمان والراحة.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{faqs.map((faq) => (
						<Card
							key={faq.q}
							className="border bg-card/60 backdrop-blur-xs transition-shadow hover:shadow-md py-0"
						>
							<CardContent className="p-6 space-y-2.5">
								<div className="flex items-start gap-3">
									<div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
										<HelpCircleIcon className="size-4" />
									</div>
									<h3 className="font-heading text-base font-bold text-foreground">
										{faq.q}
									</h3>
								</div>
								<p className="text-xs text-muted-foreground leading-relaxed ps-10">
									{faq.a}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
