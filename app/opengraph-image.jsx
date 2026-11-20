import { ImageResponse } from "next/og";
import { personalData } from "@/utils/data/personal-data";
import { readPublicImageDataUrl } from "@/utils/public-file";

export const alt = `${personalData.name} — ${personalData.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const photoDataUrl = readPublicImageDataUrl(personalData.photo);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "56px",
          padding: "80px 88px",
          color: "#f4f8fd",
          background:
            "radial-gradient(circle at 78% 16%, #123753 0, transparent 42%), linear-gradient(135deg, #070f1c 0%, #0b1628 55%, #070f1c 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div style={{ color: "#5ce6d0", fontSize: 24, letterSpacing: 5, marginBottom: 30 }}>
            DATA · INSIGHT · IMPACT
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {personalData.name}
          </div>
          <div style={{ fontSize: 34, color: "#74b9ff", marginTop: 20 }}>{personalData.designation}</div>
          <div style={{ fontSize: 24, color: "#a9bdd4", marginTop: 22 }}>{personalData.tagline}</div>
        </div>

        {photoDataUrl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 244,
              height: 244,
              borderRadius: "50%",
              padding: 6,
              background: "linear-gradient(135deg, #5ce6d0, #74b9ff)",
              boxShadow: "0 20px 60px rgba(92, 230, 208, 0.22)",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoDataUrl}
              alt={personalData.name}
              width={232}
              height={232}
              style={{
                width: 232,
                height: 232,
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center 30%",
                border: "4px solid #070f1c",
              }}
            />
          </div>
        )}
      </div>
    ),
    size
  );
}
