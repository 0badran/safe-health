import Link from "next/link";
import { Button } from "../ui/button";
import { SectionBadge } from "./section-badge";

export default function SectionHeader({
	subTitle,
	title,
	desc,
	buttonText,
	buttonLink,
	align = "start",
}: {
	subTitle?: string;
	title: string;
	desc?: string;
	buttonText?: string;
	buttonLink?: string;
	align?: "start" | "center" | "end";
}) {
	
	const aligmentClassMap: Record<"start" | "center" | "end", string> = {
		start: "items-start text-start",
		center: "items-center text-center",
		end: "items-end text-end",
	};

	return (
		<div className="flex items-end max-md:flex-wrap mb-5 lg:mb-7">
			<div
				data-figma="Heading"
				className={`relative flex flex-col  justify-center w-full min-h-30 gap-4 ${aligmentClassMap[align]}`}
			>
				<SectionBadge>{subTitle}</SectionBadge>

				<h1 className="text-heading">{title}</h1>

				{desc && <p className="text-paragraph h5 max-w-2xl">{desc}</p>}
			</div>
			{buttonText && buttonLink ? (
				<Link href={buttonLink}>
					<Button variant="outline" withArrow>
						{buttonText}
					</Button>
				</Link>
			) : null}
		</div>
	);
}
