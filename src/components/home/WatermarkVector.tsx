// حط هنا الـ <path> بتوع الـ SVG الكبير (الـ Vector اللي كان جوه الـ dialog)
// انسخهم من الكود الأصلي: كل عناصر <path ... fill="rgba(21, 155, 168, 1)" .../>
// اللي كانت جوه <svg viewBox="0 0 70 68"> وحطهم جوه الـ <svg> تحت.

export default function WatermarkVector() {
  return (
    <svg
      viewBox="0 0 70 68"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* PASTE ORIGINAL <path /> ELEMENTS HERE */}
    </svg>
  );
}
