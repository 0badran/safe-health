import Link from "next/link";
import { ArrowLeftIcon, SparklesIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorksCta() {
	return (
		<section className="py-16 md:py-20 bg-secondary/40 border-t">
			<div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
					<div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
						<SparklesIcon className="size-3.5" />
						<span>استشارة سريرية مجانية بدون أي التزام</span>
					</div>

					<h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-foreground">
						جاهز لبدء <span className="text-primary">رحلتك العلاجية</span> مع
						Safe Health؟
					</h2>

					<p className="text-sm text-muted-foreground leading-relaxed">
						تواصل معنا اليوم وسيقوم أحد مستشارينا المعتمدين بمراجعة حالتك
						واقتراح أفضل الخيارات الطبية المتاحة وتوضيح التكاليف بدقة.
					</p>

					<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
						<Button asChild size="lg" variant="default" className="shadow-md">
							<Link href="/contact" className="gap-2">
								<span>احجز استشارتك المجانية الآن</span>
								<ArrowLeftIcon className="size-4 rtl:rotate-0 rotate-180" />
							</Link>
						</Button>

						<Button asChild size="lg" variant="outline">
							<Link href="/about">تعرف على فريقنا الطبي</Link>
						</Button>
					</div>

					<div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
						<ShieldCheckIcon className="size-4 text-primary" />
						<span>أكثر من 25,000 مريض يثقون في معاييرنا المعتمدة</span>
					</div>
				</div>
			</div>
		</section>
	);
}
