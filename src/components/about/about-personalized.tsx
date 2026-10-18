import { Globe, MapPin, ShieldCheck } from "lucide-react";
import SectionHeader from "../shared/section-header";
import Image from "next/image";
import { Card } from "../ui/card";
export const featuresData = [
	{
		id: 1,
		title: "Dedicated Multilingual Care Liaisons",
		description:
			"Native coordinators supporting English, French, German, Arabic, and Japanese patients through every stage of scheduling and travel.",
		icon: <Globe className="w-6 h-6 text-secondary" />,
	},
	{
		id: 2,
		title: "International Patient Advocacy & Secure Records",
		description:
			"End-to-end encrypted medical data sharing adhering rigorously to international privacy frameworks.",
		icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
	},
	{
		id: 3,
		title: "Direct Consultation & Cross-Border Case Review",
		description:
			"Preliminary virtual evaluations with the operating surgeon prior to confirming international flight arrangements.",
		icon: <MapPin className="w-6 h-6 text-secondary" />,
	},
];
export default function AboutPersonalized() {
	return (
		<section>
			<SectionHeader
				title="Personalized Care, Beyond Borders."
				subTitle="OUR GLOBAL REACH"
				desc="We welcome patients from different parts of the world, helping them
explore aesthetic treatment options and access personalized healthcare with confidence."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
				<div className="flex flex-col gap-4">
					{featuresData.map((item) => (
						<Card key={item.id} className="flex-row px-4 shadow-md">
							<div className="bg-secondary/10 size-12 rounded-full flex items-center justify-center shrink-0">
								{item.icon}
							</div>
							<div>
								<h3 className="font-heading h5 mb-1">
									{item.title}
								</h3>
								<p className="text-paragraph small leading-relaxed">
									{item.description}
								</p>
							</div>
						</Card>
					))}
				</div>

				<div className="relative aspect-4/3 w-full overflow-hidden">
					<Image
						src="/images/global-flight.png"
						alt="Advanced aesthetic treatment at SafeHealthMe"
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
