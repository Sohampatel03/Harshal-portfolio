import { ImageResponse } from "next/og";
import { personalData } from "@/utils/data/personal-data";

export const alt = `${personalData.name} — ${personalData.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "88px", color: "#f1f6fc", background: "radial-gradient(circle at 78% 16%, #123753 0, transparent 38%), linear-gradient(135deg, #07111e 0%, #0b1b2c 55%, #07111e 100%)", fontFamily: "Arial, sans-serif" }}>
    <div style={{ color: "#65e0d0", fontSize: 26, letterSpacing: 5, marginBottom: 34 }}>DATA · INSIGHT · IMPACT</div>
    <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>{personalData.name}</div>
    <div style={{ fontSize: 34, color: "#85c9ff", marginTop: 20 }}>{personalData.designation}</div>
    <div style={{ fontSize: 24, color: "#a9bbce", marginTop: 22 }}>{personalData.tagline}</div>
  </div>, size);
}
