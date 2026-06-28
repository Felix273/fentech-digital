import { ImageResponse } from "next/og";

export const alt = "FenTech Digital — Enterprise IT Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1d4ed8 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>
          FEN<span style={{ color: "#3b82f6" }}>TECH</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 60, maxWidth: 980 }}>
          Technology that moves your business forward.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#cbd5e1", marginTop: 36 }}>
          Managed IT · Cloud · Cybersecurity · Software Development
        </div>
      </div>
    ),
    size,
  );
}
