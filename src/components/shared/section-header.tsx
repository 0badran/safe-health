import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SectionBadge } from "./section-badge";

const inter = "'Inter', sans-serif";
const merienda = "'Merienda One', Georgia, serif";

export default function SectionHeader({
	subTitle,
	title,
	desc,
	buttonText,
	buttonLink,
}: {
	subTitle: string;
	title: string;
	desc: string;
	buttonText?: string;
	buttonLink?: string;
}) {
	return (
		<div className="flex items-end max-md:flex-wrap  mb-5 lg:mb-7">
			<div
				data-figma="Heading"
				className="relative flex flex-col items-start justify-center w-full"
				style={{ gap: 12.8, minHeight: 169 }}
			>
				<SectionBadge>{subTitle}</SectionBadge>

				<h1
					style={{
						margin: 0,
						fontFamily: merienda,
						fontWeight: 400,
						fontSize: "clamp(29.76px, 4.969vw, 48px)",
						lineHeight: 1.1,
						letterSpacing: "-2px",
						color: "#392579",
					}}
				>
					{title}
				</h1>

				<p
					style={{
						margin: 0,
						maxWidth: 834,
						fontFamily: inter,
						fontWeight: 500,
						fontSize: "clamp(12.4px, 2.0704vw, 20px)",
						lineHeight: 1.36,
						color: "#475569",
					}}
				>
					{desc}
				</p>
			</div>
			{buttonText ? (
				<Link href={buttonLink || ""}>
					<Button
						variant={"outline"}
						className="flex items-center font-semibold text-secondary capitalize justify-between py-5  text-base "
					>
						{buttonText}
						<div className="bg-secondary text-white p-2 my-1  rounded-full">
							<ArrowRight />
						</div>
					</Button>
				</Link>
			) : null}
		</div>
	);
}
