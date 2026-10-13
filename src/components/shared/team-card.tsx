const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");
  html, body { margin: 0; padding: 0; background: #fff; }
  * { box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
`;

const font = "'Inter', sans-serif";

export default function TeamCard({imgSrc,expYears,name,special}:{
  imgSrc:string;
  expYears:number;
  name:string;
  special:string;
}) {
  return (
    <>
      <style>{styles}</style>
      <div
        data-figma="Card"
        className="relative flex flex-col justify-end items-start w-full"
        style={{
          maxWidth: 350,
          minHeight: 294,
          padding: 16,
          gap: 34,
          borderRadius: 16,
          boxShadow: "0 0 0 1.07px #e8e8e8",
          backgroundColor: "#e8e8e8",
          backgroundImage:`url('${imgSrc}')`,
          backgroundPosition: "79.02% 0%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          data-figma="Doctor Details"
          className="flex flex-col self-stretch"
          style={{
            gap: 8.53,
            padding: 12.8,
            minHeight: 70,
            background: "#fff",
            borderRadius: 17.07,
          }}
        >
          <div
            data-figma="Doctor Name & Speciality"
            className="flex flex-wrap items-center"
            style={{ gap: 4 }}
          >
            <span
              style={{
                fontFamily: font,
                fontWeight: 600,
                fontSize: "clamp(12px, 4.5715vw, 16px)",
                lineHeight: 1.2,
                color: "#1e1e1e",
              }}
            >
             {name}
            </span>
            <span
              style={{
                fontFamily: font,
                fontWeight: 400,
                fontSize: "clamp(12px, 3.7143vw, 13px)",
                lineHeight: 1.2,
                color: "#1e1e1e",
              }}
            >
              {special}
            </span>
          </div>

          <span
            data-figma="15+ Years of Experience"
            style={{
              fontFamily: font,
              fontWeight: 400,
              fontSize: "clamp(12px, 4vw, 14px)",
              lineHeight: 1.2,
              color: "#5d5d5d",
            }}
          >
            {expYears}+ Years of Experience
          </span>
        </div>
      </div>
    </>
  );
}