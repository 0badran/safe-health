import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const inter = "'Inter', sans-serif";
const merienda = "'Merienda One', Georgia, serif";

function Ornament({ flip = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        flex: "none",
        width: 24.53,
        height: 8.53,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 3.73,
          width: 17.07,
          height: 1.07,
          background: "#7b61ff",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 16,
          top: 0,
          width: 8.53,
          height: 8.53,
          borderRadius: "50%",
          background: "#392579",
        }}
      />
    </div>
  );
}

export default function SectionHeader({ subTitle, title, desc, buttonText, buttonLink }: { subTitle: string, title: string, desc: string, buttonText?: string, buttonLink?: string }) {
  return (
    <div className="flex items-end max-md:flex-wrap  mb-5 lg:mb-7">

      <div
        data-figma="Heading"
        className="relative flex flex-col items-start justify-center w-full"
        style={{ gap: 12.8, minHeight: 169 }}
      >
        <div
          data-figma="Overhead Text"
          className="inline-flex items-center max-w-full"
          style={{
            gap: 10.67,
            padding: "8.53px 12.8px",
            background: "#eaf5f4",
            borderRadius: 12.8,
          }}
        >
          <Ornament />
          <span
            style={{
              fontFamily: inter,
              fontWeight: 400,
              fontSize: "clamp(12px, 1.6564vw, 16px)",
              lineHeight: 1.2,
              color: "#282331",
            }}
          >
            {subTitle}
          </span>
          <Ornament flip />
        </div>

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
      {buttonText ?
        <Link href={buttonLink || ""}>
          <Button
            variant={"outline"}
            className="flex items-center font-semibold text-secondary capitalize justify-between py-5  text-base ">
            {buttonText}
            <div className="bg-secondary text-white p-2 my-1  rounded-full">

              <ArrowRight />
            </div>
          </Button>
        </Link>

        : null}
    </div>
  );
}