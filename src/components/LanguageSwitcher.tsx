"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import { CheckIcon, GlobeIcon } from "lucide-react"
import { Button } from "./ui/button"

export function LanguageSwitcher() {
	const { language, setLanguage, isRtl, availableLanguages } = useLanguage()

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="text-white hover:bg-white/10 hover:text-white rounded-full size-9 transition-colors"
					aria-label="Switch Language / تغيير اللغة"
				>
					<GlobeIcon className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align={isRtl ? "start" : "end"}
				className="min-w-36 bg-[#2a1b5c] border-white/15 text-white shadow-xl"
			>
				{availableLanguages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => setLanguage(lang.code)}
						className="flex items-center justify-between py-2 text-white hover:bg-white/10 cursor-pointer"
					>
						<span className="flex items-center gap-2">
							<span>{lang.flag}</span>
							<span className="text-xs font-medium">{lang.label}</span>
						</span>
						{language === lang.code && (
							<CheckIcon className="size-3.5 text-[#159BA8]" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}