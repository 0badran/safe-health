import WatermarkVector from "../WatermarkVector";


const responsiveCss =
  "/* Responsive behaviour, below the width this design was drawn at. Above it every box is where Figma put it. */ @media (max-width:1439.98px){.r-grow{height:auto!important}.r-wrap{white-space:pre-wrap!important;overflow-wrap:break-word}.r-wrap span{transform:none!important}}";

const inputWrap = {
  maxWidth: "100%",
  alignSelf: "stretch",
  cursor: "text",
  borderRadius: "12px",
  padding: "12px",
};

const inputValueWrap = {
  flex: "1 1 auto",
  minWidth: "0",
  maxWidth: "100%",
  minHeight: "24px",
  fontFamily: "'Inter', sans-serif",
};

const inputReset = {
  border: "0",
  outline: "0",
  minWidth: "0",
  font: "inherit",
  textAlign: "inherit",
  cursor: "text",
};

const labelClass =
  "r-grow r-wrap relative flex-none w-[auto] h-[20px] flex justify-start text-left items-start text-[clamp(12px,0.9723vw,14px)] leading-[20px] whitespace-pre text-[rgba(40,35,49,1)] font-[500]";

const labelStyle = {
  maxWidth: "100%",
  alignSelf: "stretch",
  minHeight: "20px",
  fontFamily: "'Inter', sans-serif",
};

const inputValueClass =
  "relative h-[24px] flex justify-start text-left items-start text-[clamp(12px,0.9723vw,14px)] leading-[24px] whitespace-pre text-[rgba(134,133,136,1)] font-[400]";

const inputClass = "bg-[transparent] m-[0] p-[0] w-[100%] text-[inherit] tracking-[inherit]";

function ArrowIcon({ color }) {
  return (
    <div className="relative flex-none w-[16px] h-[16px] overflow-hidden">
      <div
        className="absolute top-[8px] w-[9.33px] h-[1.33px] mt-[-1.33px]"
        style={{
          left: "min(3.33px,max(0px,calc(100% - 9.33px)))",
          maxWidth: "100%",
          transformOrigin: "0 1.33px",
          background: color,
        }}
      />
      <div
        className="absolute top-[3.33px] w-[4.67px] h-[9.33px]"
        style={{ left: "min(8px,max(0px,calc(100% - 4.67px)))", maxWidth: "100%" }}
      >
        <svg
          viewBox="0 0 7 14"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          style={{ display: "block", overflow: "visible" }}
        >
          <path
            d="M0 0L7 7L0 14"
            fill="none"
            stroke={color}
            strokeWidth="1.3333333730697632"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      <style>{responsiveCss}</style>
      <div
        data-figma="Desktop - 1"
        data-fid="86"
        className="d left-[0px] top-[0px] h-[880px] w-[100%] bg-[rgba(255,255,255,1)] overflow-hidden"
      >
        {/* Purple background shape */}
        <div
          data-figma="Subtract"
          data-fid="0"
          className="absolute top-[-19px] w-[1530px] h-[733px] overflow-hidden"
          style={{ left: "calc(50% - 765px)", borderRadius: "47px" }}
        >
          <svg
            viewBox="0 0 1530 733"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <mask
                id="b279-7830"
                maskUnits="userSpaceOnUse"
                x="-1530"
                y="-733"
                width="4590"
                height="2199"
              >
                <path
                  d="M0 0L1530 0L1530 788L0 788L0 0Z"
                  transform="matrix(1,0,0,0.93,0,0)"
                  fill="#fff"
                />
                <path
                  d="M235.93 0L938.02 0L1191 240L0 240L235.93 0Z"
                  transform="matrix(1,0,0,0.88,-211,615)"
                  fill="#000"
                />
              </mask>
            </defs>
            <g mask="url(#b279-7830)">
              <rect x="0" y="0" width="1530" height="733" fill="rgba(58, 35, 127, 1)" />
            </g>
          </svg>
        </div>

        {/* Hero title */}
        <div
          data-figma="Group 1"
          data-fid="2"
          className="absolute top-[626px] w-[637px] h-[150px] overflow-hidden"
          style={{ left: "min(100px,max(0px,calc(100% - 637px)))", maxWidth: "100%" }}
        >
          <div
            data-figma="Hero Title"
            data-fid="1"
            className="r-grow r-wrap absolute top-[0px] w-[637px] h-[150px] flex justify-start text-left items-center text-[clamp(42.16px,4.7223vw,68px)] leading-[1.1] whitespace-pre text-[transparent] font-[600] tracking-[-2px]"
            style={{
              left: "0px",
              maxWidth: "100%",
              minHeight: "150px",
              backgroundImage:
                "linear-gradient(90deg, rgba(58, 41, 131, 1) 36.56%, rgba(203, 177, 255, 1) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              fontFamily: "'Lora', sans-serif",
            }}
          >
            <span>{"Your Health Journey, \nHandled with Care"}</span>
          </div>
        </div>

        {/* Consultation dialog */}
        <div
          data-figma="Group 3"
          data-fid="43"
          className="absolute top-[150px] w-[541px] h-[664px] overflow-hidden"
          style={{ left: "min(799px,max(0px,calc(100% - 541px)))", maxWidth: "100%" }}
        >
          <div
            data-figma="Request consultation dialog"
            data-fid="42"
            className="r-grow absolute top-[0px] w-[541px] h-[664px] bg-[rgba(240,237,246,1)] overflow-hidden flex box-border flex-col gap-[12px] items-start"
            style={{
              left: "0px",
              maxWidth: "100%",
              borderRadius: "16px",
              boxShadow: "0px 16px 48px 0px rgba(57, 37, 121, 0.16)",
              padding: "32px",
              minHeight: "664px",
            }}
          >
            {/* Watermark (SVG lives in WatermarkVector.jsx) */}
            <div
              data-figma="Vector"
              data-fid="3"
              className="absolute left-[214px] top-[5px] w-[454px] h-[442px] opacity-[0.04]"
              style={{ maxWidth: "100%" }}
            >
              <WatermarkVector />
            </div>

            <div
              data-figma="Dialog heading"
              data-fid="5"
              className="relative flex-none w-[auto] h-[44px] overflow-hidden flex box-border gap-[16px] items-center"
              style={{ maxWidth: "100%", alignSelf: "stretch" }}
            >
              <div
                data-figma="Title"
                data-fid="4"
                className="r-grow r-wrap relative flex-none w-[318px] h-[40px] flex justify-start text-left items-start text-[clamp(17.36px,1.9445vw,28px)] leading-[40px] whitespace-pre text-[rgba(21,155,168,1)] font-[600]"
                style={{
                  maxWidth: "100%",
                  minHeight: "40px",
                  fontFamily: "'Lora', sans-serif",
                  textTransform: "capitalize",
                }}
              >
                <span>Request a consultation.</span>
              </div>
            </div>

            <div
              data-figma="Description"
              data-fid="6"
              className="r-grow r-wrap relative flex-none w-[auto] h-[52px] flex justify-start text-left items-start text-[clamp(12px,1.1112vw,16px)] leading-[26px] whitespace-pre text-[rgba(40,35,49,1)] font-[400]"
              style={{
                maxWidth: "100%",
                alignSelf: "stretch",
                minHeight: "52px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>
                {"Share your contact details and our team will discuss \navailability. Required fields are marked *."}
              </span>
            </div>

            {/* Full name */}
            <div
              data-figma="Form field"
              data-fid="10"
              className="r-grow relative flex-none w-[auto] h-[70px] overflow-hidden flex box-border flex-col gap-[8px] items-start"
              style={{ maxWidth: "100%", alignSelf: "stretch", minHeight: "70px" }}
            >
              <div className={labelClass} style={labelStyle}>
                <span>Full name </span>
              </div>
              <div
                data-figma="Input"
                className="relative flex-none w-[auto] h-[42px] bg-[rgba(71,85,105,1)] overflow-hidden flex box-border gap-[12px] items-center"
                style={inputWrap}
              >
                <div className={`${inputValueClass} w-[453px]`} style={inputValueWrap}>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="off"
                    spellCheck="false"
                    className={inputClass}
                    style={inputReset}
                  />
                </div>
              </div>
            </div>

            {/* Email + phone */}
            <div
              data-figma="Frame 2147225169"
              data-fid="19"
              className="relative flex-none w-[auto] h-[70px] flex box-border gap-[22px] items-start"
              style={{ maxWidth: "100%", alignSelf: "stretch" }}
            >
              <div
                data-figma="Form field"
                data-fid="14"
                className="r-grow relative w-[227.5px] h-[70px] overflow-hidden flex box-border flex-col gap-[8px] items-start"
                style={{ flex: "1 1 auto", minWidth: "0", maxWidth: "100%", minHeight: "70px" }}
              >
                <div className={labelClass} style={labelStyle}>
                  <span>Email address </span>
                </div>
                <div
                  data-figma="Input"
                  className="relative flex-none w-[auto] h-[42px] bg-[rgba(71,85,105,1)] overflow-hidden flex box-border gap-[12px] items-center"
                  style={inputWrap}
                >
                  <div className={`${inputValueClass} w-[203.5px]`} style={inputValueWrap}>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      autoComplete="off"
                      spellCheck="false"
                      className={inputClass}
                      style={inputReset}
                    />
                  </div>
                </div>
              </div>

              <div
                data-figma="Form field"
                data-fid="18"
                className="r-grow relative w-[227.5px] h-[70px] overflow-hidden flex box-border flex-col gap-[8px] items-start"
                style={{ flex: "1 1 auto", minWidth: "0", maxWidth: "100%", minHeight: "70px" }}
              >
                <div className={labelClass} style={labelStyle}>
                  <span>Phone number </span>
                </div>
                <div
                  data-figma="Input"
                  className="relative flex-none w-[auto] h-[42px] bg-[rgba(71,85,105,1)] overflow-hidden flex box-border gap-[12px] items-center"
                  style={inputWrap}
                >
                  <div className={`${inputValueClass} w-[203.5px]`} style={inputValueWrap}>
                    <input
                      type="tel"
                      placeholder="+90 532 123 45 67"
                      autoComplete="off"
                      spellCheck="false"
                      className={inputClass}
                      style={inputReset}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Country */}
            <div
              data-figma="Form field"
              data-fid="25"
              className="r-grow relative flex-none w-[auto] h-[70px] overflow-hidden flex box-border flex-col gap-[8px] items-start"
              style={{ maxWidth: "100%", alignSelf: "stretch", minHeight: "70px" }}
            >
              <div className={labelClass} style={{ ...labelStyle, textTransform: "capitalize" }}>
                <span>country </span>
              </div>
              <div
                data-figma="Input"
                className="relative flex-none w-[auto] h-[42px] bg-[rgba(71,85,105,1)] overflow-hidden flex box-border gap-[12px] items-center"
                style={inputWrap}
              >
                <div className={`${inputValueClass} w-[421px]`} style={inputValueWrap}>
                  <input
                    type="text"
                    placeholder="Which country are you from?"
                    autoComplete="off"
                    spellCheck="false"
                    className={inputClass}
                    style={inputReset}
                  />
                </div>
                <div
                  data-figma="chevron-down"
                  className="relative flex-none w-[20px] h-[20px] overflow-hidden"
                  style={{ maxWidth: "100%" }}
                >
                  <div
                    className="absolute top-[7.5px] w-[10px] h-[5px]"
                    style={{ left: "min(5px,max(0px,calc(100% - 10px)))", maxWidth: "100%" }}
                  >
                    <svg
                      viewBox="0 0 12 6"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                      style={{ display: "block", overflow: "visible" }}
                    >
                      <path
                        d="M0 0L6 6L12 0"
                        fill="none"
                        stroke="rgba(8, 105, 114, 1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div
              data-figma="Form field"
              data-fid="29"
              className="r-grow relative flex-none w-[auto] h-[118px] overflow-hidden flex box-border flex-col gap-[8px] items-start"
              style={{ maxWidth: "100%", alignSelf: "stretch", minHeight: "118px" }}
            >
              <div className={labelClass} style={labelStyle}>
                <span>message</span>
              </div>
              <div
                data-figma="Input"
                className="relative flex-none w-[auto] h-[90px] bg-[rgba(71,85,105,1)] overflow-hidden flex box-border gap-[12px] items-start"
                style={inputWrap}
              >
                <div
                  className="relative h-[100%] flex justify-start text-left items-start text-[clamp(12px,0.9723vw,14px)] leading-[24px] text-[rgba(134,133,136,1)] font-[400]"
                  style={{ ...inputValueWrap, minHeight: "24px" }}
                >
                  <textarea
                    placeholder="Tell us about the treatment you are considering."
                    autoComplete="off"
                    spellCheck="false"
                    className="bg-[transparent] m-[0] p-[0] w-[100%] h-[100%] text-[inherit] resize-none"
                    style={{ border: "0", outline: "0", font: "inherit", cursor: "text" }}
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <label
              data-figma="Checkbox option"
              data-fid="34"
              className="relative flex-none w-[auto] h-[44px] overflow-hidden flex box-border gap-[12px] items-center"
              style={{
                maxWidth: "100%",
                alignSelf: "stretch",
                cursor: "pointer",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              <div
                data-figma="Selection control"
                className="relative flex-none w-[20px] h-[20px] bg-[rgba(21,155,168,1)] overflow-hidden flex box-border justify-center items-center"
                style={{
                  maxWidth: "100%",
                  borderRadius: "4px",
                  boxShadow: "inset 0 0 0 1px rgba(21, 155, 168, 1)",
                }}
              >
                <div className="relative flex-none w-[14px] h-[14px] overflow-hidden" style={{ maxWidth: "100%" }}>
                  <div
                    className="absolute top-[3.5px] w-[9.33px] h-[6.42px]"
                    style={{ left: "min(2.33px,max(0px,calc(100% - 9.33px)))", maxWidth: "100%" }}
                  >
                    <svg
                      viewBox="0 0 16 11"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      focusable="false"
                      style={{ display: "block", overflow: "visible" }}
                    >
                      <path
                        d="M16 0L5 11L0 6"
                        fill="none"
                        stroke="rgba(255, 255, 255, 1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                data-figma="Option label"
                className="r-grow r-wrap relative w-[445px] h-[21px] flex justify-start text-left items-start text-[clamp(12px,0.9723vw,14px)] leading-[1.5] whitespace-pre text-[rgba(40,35,49,1)] font-[400]"
                style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  maxWidth: "100%",
                  minHeight: "21px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span>I agree to be contacted about this request. *</span>
              </div>
            </label>

            {/* Submit */}
            <div
              data-figma="Dialog actions"
              data-fid="41"
              className="relative flex-none w-[auto] h-[48px] overflow-hidden flex box-border gap-[12px] items-start"
              style={{ maxWidth: "100%", alignSelf: "stretch" }}
            >
              <button
                type="button"
                data-figma="Component 26"
                className="relative flex-none w-[160.56px] h-[48px] bg-[rgba(21,155,168,1)] flex box-border gap-[6px] justify-end items-center"
                style={{
                  maxWidth: "100%",
                  border: "0",
                  cursor: "pointer",
                  borderRadius: "1097.8px",
                  padding: "2px 2px 2px 16px",
                }}
              >
                <span
                  className="r-wrap relative flex-none w-[97px] h-[22px] flex justify-start text-left items-start text-[clamp(12px,1.0417vw,15px)] leading-[22px] whitespace-pre text-[rgba(255,255,255,1)] font-[600]"
                  style={{ maxWidth: "100%", fontFamily: "'Inter', sans-serif" }}
                >
                  Send request
                </span>
                <span
                  className="relative flex-none w-[39.56px] h-[39.56px] bg-[rgba(255,255,255,1)] flex box-border gap-[10px] justify-center items-center"
                  style={{ maxWidth: "100%", borderRadius: "1097.8px", padding: "12px" }}
                >
                  <ArrowIcon color="rgba(21,155,168,1)" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Left column: tagline, video, buttons */}
        <div
          data-figma="Frame 2147225171"
          data-fid="64"
          className="r-grow absolute top-[150px] w-[575px] h-[422.79px] flex box-border flex-col gap-[16px] items-start"
          style={{ left: "min(101px,max(0px,calc(100% - 575px)))", maxWidth: "100%", minHeight: "422.79px" }}
        >
          <div
            data-figma="Tagline"
            data-fid="44"
            className="r-grow r-wrap relative flex-none w-[auto] h-[87px] opacity-[0.8] flex justify-start text-left items-center text-[clamp(14.88px,1.6667vw,24px)] leading-[1.2] whitespace-pre text-[rgba(255,255,255,1)] font-[400]"
            style={{
              maxWidth: "100%",
              alignSelf: "stretch",
              minHeight: "87px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span>
              {"Where advanced aesthetic care meets a \npersonalized approach to beauty, confidence, and \nwell-being."}
            </span>
          </div>

          {/* Video card */}
          <div
            data-figma="Group 2"
            data-fid="50"
            className="relative flex-none w-[575px] h-[255.79px] overflow-hidden"
            style={{ maxWidth: "100%" }}
          >
            <div
              data-figma="Rectangle 6667448"
              data-fid="45"
              className="absolute left-[575px] top-[0px] w-[575px] h-[255.79px] bg-[url('https://canvas.originkit.dev/api/figma/image/Jwl332mkUsTXkkwmzOR06d/659744084c641ae0645d6bf879dc03fde1a00639')0%0.75%/100%126.45%no-repeat,linear-gradient(rgba(232,235,247,0.1),rgba(232,235,247,0.1))]"
              style={{
                maxWidth: "100%",
                transform: "matrix(-1,0,0,1,0,0)",
                transformOrigin: "0 0",
                borderRadius: "20px",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.3)",
              }}
            />
            <div
              data-figma="Rectangle 6667449"
              data-fid="46"
              className="absolute left-[575px] top-[0px] w-[575px] h-[255.79px] bg-[rgba(62,42,131,0.26)]"
              style={{
                maxWidth: "100%",
                transform: "matrix(-1,0,0,1,0,0)",
                transformOrigin: "0 0",
                borderRadius: "20px",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.3)",
              }}
            />
            <div
              data-figma="play-circle-02"
              data-fid="49"
              className="absolute top-[72.98px] w-[92.88px] h-[92.88px]"
              style={{ left: "min(241.06px,max(0px,calc(100% - 92.88px)))", maxWidth: "100%", cursor: "pointer" }}
            >
              <div
                className="absolute top-[7.74px] w-[77.4px] h-[77.4px]"
                style={{ left: "min(7.74px,max(0px,calc(100% - 77.4px)))", maxWidth: "100%" }}
              >
                <svg
                  viewBox="0 0 20 20"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: "block", overflow: "visible" }}
                >
                  <path
                    d="M20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10Z"
                    fill="rgba(217, 217, 217, 0.5)"
                    fillRule="nonzero"
                  />
                  <path
                    d="M20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10"
                    fill="none"
                    stroke="rgba(248, 248, 248, 1)"
                    strokeWidth="0.5"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div
                className="absolute top-[32.9px] w-[25.16px] h-[27.09px]"
                style={{ left: "min(36.77px,max(0px,calc(100% - 25.16px)))", maxWidth: "100%" }}
              >
                <svg
                  viewBox="0 0 6.5 7"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: "block", overflow: "visible" }}
                >
                  <path
                    d="M0 2.7L0 4.3C0 5.82 0 6.58 0.46 6.89C0.91 7.19 1.53 6.85 2.78 6.17L4.25 5.37C5.75 4.56 6.5 4.15 6.5 3.5C6.5 2.85 5.75 2.44 4.25 1.63L2.78 0.83C1.53 0.15 0.91 -0.19 0.46 0.11C0 0.42 0 1.18 0 2.7Z"
                    fill="rgba(248, 248, 248, 1)"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            data-figma="Dialog actions"
            data-fid="63"
            className="relative flex-none w-[455px] h-[48px] overflow-hidden flex box-border gap-[12px] items-start"
            style={{ maxWidth: "100%" }}
          >
            <button
              type="button"
              data-figma="Component 26"
              className="relative flex-none w-[166.76px] h-[48px] bg-[rgba(255,255,255,1)]"
              style={{
                maxWidth: "100%",
                border: "0",
                cursor: "pointer",
                borderRadius: "1097.8px",
                boxShadow: "inset 0 0 0 1.1px rgba(21, 155, 168, 1)",
              }}
            >
              <span
                className="r-wrap absolute top-[13px] w-[101px] h-[22px] flex justify-start text-left items-start text-[clamp(12px,1.0417vw,15px)] leading-[22px] whitespace-pre text-[rgba(21,155,168,1)] font-[600]"
                style={{
                  left: "min(17.1px,max(0px,calc(100% - 101px)))",
                  maxWidth: "100%",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                start planning
              </span>
              <span
                className="absolute top-[4.22px] w-[39.56px] h-[39.56px] bg-[rgba(21,155,168,1)] flex box-border gap-[10px] justify-center items-center"
                style={{
                  left: "min(124.1px,max(0px,calc(100% - 39.56px)))",
                  maxWidth: "100%",
                  borderRadius: "1097.8px",
                  padding: "12px",
                }}
              >
                <ArrowIcon color="rgba(255,255,255,1)" />
              </span>
            </button>

            <button
              type="button"
              data-figma="Component 27"
              className="relative flex-none w-[181.56px] h-[48px] bg-[rgba(21,155,168,1)] flex box-border gap-[6px] justify-end items-center"
              style={{
                maxWidth: "100%",
                border: "0",
                cursor: "pointer",
                borderRadius: "1097.8px",
                padding: "2px 2px 2px 16px",
              }}
            >
              <span
                className="r-wrap relative flex-none w-[118px] h-[22px] flex justify-start text-left items-start text-[clamp(12px,1.0417vw,15px)] leading-[22px] whitespace-pre text-[rgba(255,255,255,1)] font-[600]"
                style={{ maxWidth: "100%", fontFamily: "'Inter', sans-serif" }}
              >
                view treatments
              </span>
              <span
                className="relative flex-none w-[39.56px] h-[39.56px] bg-[rgba(21,155,168,1)] flex box-border gap-[10px] justify-center items-center"
                style={{ maxWidth: "100%", borderRadius: "1097.8px", padding: "12px" }}
              >
                <ArrowIcon color="rgba(255,255,255,1)" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}