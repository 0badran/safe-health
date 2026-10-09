import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";

function FacebookSvg({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	);
}

function TwitterSvg({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

function LinkedinSvg({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
		</svg>
	);
}

export function AboutTeam() {
	const teamMembers = [
		{
			name: "د. سوني ماديسون",
			englishName: "Sony Madison",
			role: "الرئيس التنفيذي والمؤسس",
			englishRole: "CEO, Director",
			image: "/images/about/team-ceo.jpg",
			socials: {
				linkedin: "https://linkedin.com",
				twitter: "https://twitter.com",
				facebook: "https://facebook.com",
				email: "mailto:contact@safehealth.com",
			},
		},
		{
			name: "د. هاري وارث",
			englishName: "Hary Warth",
			role: "المدير الطبي والعمليات الإكلينيكية",
			englishRole: "Head Manager",
			image: "/images/about/team-cmo.jpg",
			socials: {
				linkedin: "https://linkedin.com",
				twitter: "https://twitter.com",
				facebook: "https://facebook.com",
				email: "mailto:contact@safehealth.com",
			},
		},
		{
			name: "د. جيني هوب",
			englishName: "Jenny Hobb",
			role: "مديرة تجربة ورعاية المرضى",
			englishRole: "Branch Manager",
			image: "/images/about/team-director.jpg",
			socials: {
				linkedin: "https://linkedin.com",
				twitter: "https://twitter.com",
				facebook: "https://facebook.com",
				email: "mailto:contact@safehealth.com",
			},
		},
		{
			name: "د. جوني سميث",
			englishName: "Johny Smith",
			role: "المشرف العام على الجودة السريرية",
			englishRole: "Supervisor",
			image: "/images/about/team-supervisor.jpg",
			socials: {
				linkedin: "https://linkedin.com",
				twitter: "https://twitter.com",
				facebook: "https://facebook.com",
				email: "mailto:contact@safehealth.com",
			},
		},
	];

	return (
		<section className="py-16 md:py-24 bg-muted/30 border-t">
			<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header matching template: • OUR TEAM • and title */}
				<div className="flex flex-col items-center text-center space-y-3 mb-16 max-w-2xl mx-auto">
					<SectionBadge>فريقنا المعتمد</SectionBadge>

					<h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
						<span className="text-primary">نخبة</span> أعضاء الفريق
					</h2>

					<p className="text-sm text-muted-foreground leading-relaxed">
						كوادر وخبرات تجمع بين الريادة الطبية والكفاءة الإدارية لتوفير بيئة
						رعاية استثنائية وآمنة ترتقي بتجربة كل مريض.
					</p>
				</div>

				{/* 4 Cards Grid matching template */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
					{teamMembers.map((member) => (
						<div
							key={member.englishName}
							className="group flex flex-col items-center transition-all duration-300"
						>
							{/* Member Photo Card with Top Rounded Corners */}
							<div className="relative aspect-square w-full overflow-hidden rounded-3xl border bg-card shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
								<Image
									src={member.image}
									alt={member.name}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							{/* Pill Badge with Semantic Primary Tokens */}
							<div className="-mt-8 z-10 w-[85%] rounded-2xl bg-primary text-primary-foreground px-4 py-3 text-center shadow-lg transition-transform duration-300 group-hover:scale-105">
								<h3 className="font-heading text-sm sm:text-base font-bold tracking-tight line-clamp-1">
									{member.name}
								</h3>
								<p className="text-[11px] font-medium text-primary-foreground/80 line-clamp-1">
									{member.role}
								</p>
							</div>

							{/* Social Media Links Row matching template */}
							<div className="mt-4 flex items-center justify-center gap-2">
								<Link
									href={member.socials.facebook}
									target="_blank"
									rel="noopener noreferrer"
									className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
									aria-label={`فيسبوك ${member.name}`}
								>
									<FacebookSvg className="size-3.5" />
								</Link>
								<Link
									href={member.socials.twitter}
									target="_blank"
									rel="noopener noreferrer"
									className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
									aria-label={`تويتر ${member.name}`}
								>
									<TwitterSvg className="size-3.5" />
								</Link>
								<Link
									href={member.socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
									aria-label={`لينكد إن ${member.name}`}
								>
									<LinkedinSvg className="size-3.5" />
								</Link>
								<Link
									href={member.socials.email}
									className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
									aria-label={`مراسلة ${member.name}`}
								>
									<MailIcon className="size-3.5" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
