import Link from "next/link";
import {
	HeartPulseIcon,
	PhoneIcon,
	MailIcon,
	MessageCircleIcon,
	ShieldCheckIcon,
	AwardIcon,
	LockIcon,
	CheckCircle2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
	const patientLinks = [
		{ label: "كيف تعمل المنظومة", href: "#how-it-works" },
		{ label: "دليل تكلفة العمليات", href: "#cost-guides" },
		{ label: "تجارب وقصص المرضى", href: "#reviews" },
		{ label: "الأسئلة الشائعة", href: "#faq" },
		{ label: "المقالات الطبية الموثقة", href: "#articles" },
	];

	const popularTreatments = [
		{ label: "زراعة الشعر (FUE & DHI)", href: "#treatments" },
		{ label: "تجميل وابتسامة الأسنان", href: "#treatments" },
		{ label: "جراحات تجميل الأنف", href: "#treatments" },
		{ label: "جراحات السمنة والتكميم", href: "#treatments" },
		{ label: "أطفال الأنابيب والإخصاب", href: "#treatments" },
		{ label: "تصحيح النظر والفيمتو ليزك", href: "#treatments" },
	];

	const doctorLinks = [
		{ label: "معايير اختيار الأطباء (SafeScore)", href: "#vetted" },
		{ label: "انضمام الأطباء والعيادات", href: "#join" },
		{ label: "بوابة إدارة المرضى B2B", href: "#portal" },
		{ label: "ضمان الجودة ومطابقة الأسعار", href: "#guarantee" },
		{ label: "فريق المتابعة الطبية", href: "#team" },
	];

	return (
		<footer className="border-t bg-card text-card-foreground">
			{/* Upper Footer: Trust & Certifications Bar */}
			<div className="border-b bg-muted/40">
				<div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<div className="flex items-center gap-3.5">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<ShieldCheckIcon className="size-6" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">
									أطباء معتمدون 100%
								</span>
								<span className="text-xs text-muted-foreground">
									فحص دقيق لتراخيص وخبرات الجراحين
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3.5">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<AwardIcon className="size-6" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">
									ضمان الرعاية والجودة
								</span>
								<span className="text-xs text-muted-foreground">
									متابعة شخصية مستمرة مع المريض
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3.5">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<CheckCircle2Icon className="size-6" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">
									مطابقة أفضل تكلفة
								</span>
								<span className="text-xs text-muted-foreground">
									أسعار مباشرة وشفافة بدون رسوم خفية
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3.5">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<LockIcon className="size-6" />
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-foreground">
									سرية البيانات الصحية
								</span>
								<span className="text-xs text-muted-foreground">
									تشفير متقدم متوافق مع معايير GDPR
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Navigation Columns */}
			<div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
					{/* Column 1: Brand Info */}
					<div className="space-y-4 lg:col-span-2">
						<Link href="/" className="flex items-center gap-2.5">
							<div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
								<HeartPulseIcon className="size-6" />
							</div>
							<span className="font-heading text-2xl font-bold tracking-tight text-primary">
								Safe Health
							</span>
						</Link>

						<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
							منصتك الموثوقة لاستكشاف أفضل الأطباء والعيادات المعتمدة، ومقارنة
							التكاليف، وحجز العمليات الطبية والتجميلية بمرافقة استشارية شخصية
							على مدار الساعة.
						</p>

						<div className="space-y-2 pt-2">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<PhoneIcon className="size-4 text-primary" />
								<span dir="ltr">+966 50 123 4567 / +44 20 7946 0991</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<MailIcon className="size-4 text-primary" />
								<span>support@safehealth.com</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<MessageCircleIcon className="size-4 text-primary" />
								<span>دعم مباشر فوري عبر واتساب 24/7</span>
							</div>
						</div>
					</div>

					{/* Column 2: Patients */}
					<div className="space-y-3">
						<h4 className="font-heading text-sm font-bold text-foreground">
							دليل المرضى
						</h4>
						<ul className="space-y-2 text-xs">
							{patientLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-muted-foreground transition-colors hover:text-primary"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Treatments */}
					<div className="space-y-3">
						<h4 className="font-heading text-sm font-bold text-foreground">
							أبرز العلاجات
						</h4>
						<ul className="space-y-2 text-xs">
							{popularTreatments.map((treatment) => (
								<li key={treatment.label}>
									<Link
										href={treatment.href}
										className="text-muted-foreground transition-colors hover:text-primary"
									>
										{treatment.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 4: Doctors & Clinics */}
					<div className="space-y-3">
						<h4 className="font-heading text-sm font-bold text-foreground">
							للأطباء والمراكز
						</h4>
						<ul className="space-y-2 text-xs">
							{doctorLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-muted-foreground transition-colors hover:text-primary"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>

						<div className="pt-3">
							<Button variant="outline" size="sm" className="w-full">
								انضم كطبيب معتمد
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar: Copyright & Legal */}
			<div className="border-t bg-muted/20">
				<div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
					<p>© 2026 Safe Health. جميع الحقوق محفوظة.</p>
					<div className="flex flex-wrap items-center gap-6">
						<Link href="#privacy" className="hover:text-foreground">
							سياسة الخصوصية
						</Link>
						<Link href="#terms" className="hover:text-foreground">
							شروط الاستخدام
						</Link>
						<Link href="#cookies" className="hover:text-foreground">
							ملفات تعريف الارتباط
						</Link>
						<Link href="#security" className="hover:text-foreground">
							الأمان والامتثال
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
