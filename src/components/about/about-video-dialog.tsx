"use client";

import * as React from "react";
import { PlayIcon, FilmIcon, SparklesIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AboutVideoDialogProps {
	children?: React.ReactNode;
}

export function AboutVideoDialog({ children }: AboutVideoDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{children || (
					<Button
						variant="default"
						size="icon-lg"
						className="size-16 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
						aria-label="مشاهدة الفيديو التعريفي"
					>
						<PlayIcon className="size-8 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-card border">
				<DialogHeader className="p-6 pb-2 text-start">
					<div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider">
						<FilmIcon className="size-4" />
						<span>فيديو وثائقي تعريفي</span>
					</div>
					<DialogTitle className="text-xl sm:text-2xl font-bold">
						جولة داخل منظومة Safe Health للرعاية الطبية وإدارة العيادات
					</DialogTitle>
					<DialogDescription>
						تعرف على كيفية مساهمة كفاءاتنا الطبية وتقنياتنا الذكية في تقديم
						رعاية متكاملة ورحلة علاجية آمنة للمرضى.
					</DialogDescription>
				</DialogHeader>

				<div className="relative aspect-video w-full bg-muted/60 flex items-center justify-center overflow-hidden border-t">
					<iframe
						className="size-full"
						src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
						title="فيديو تعريفي عن Safe Health"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>

				<div className="p-4 bg-muted/20 border-t flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
					<div className="flex items-center gap-1.5">
						<SparklesIcon className="size-4 text-primary" />
						<span>أكثر من 25,000 مريض يثقون في معاييرنا المعتمدة</span>
					</div>
					<span className="font-medium text-foreground">
						Safe Health © 2026
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
}
