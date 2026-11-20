import fs from "node:fs";
import path from "node:path";

export function publicFilePath(publicPath) {
  if (typeof publicPath !== "string" || !publicPath.trim()) return null;
  return path.join(process.cwd(), "public", publicPath.replace(/^\/+/, ""));
}

export function publicFileExists(publicPath) {
  const fullPath = publicFilePath(publicPath);
  if (!fullPath) return false;
  return fs.existsSync(fullPath);
}

export function readPublicImageDataUrl(publicPath) {
  const fullPath = publicFilePath(publicPath);
  if (!fullPath || !fs.existsSync(fullPath)) return null;
  const ext = path.extname(fullPath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : ext === ".svg"
          ? "image/svg+xml"
          : "image/jpeg";
  const base64 = fs.readFileSync(fullPath).toString("base64");
  return `data:${mime};base64,${base64}`;
}
