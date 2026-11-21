import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { certifications } from "../utils/data/educations.js";
import { projectsData } from "../utils/data/projects-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");

function fileExistsInPublic(publicPath) {
  if (typeof publicPath !== "string" || !publicPath.trim()) return false;
  return fs.existsSync(path.join(publicDir, publicPath.replace(/^\/+/, "")));
}

function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

console.log("=== Certifications ===");
for (const cert of certifications) {
  const imageExists = fileExistsInPublic(cert.image);
  const urlStatus = hasNonEmptyString(cert.url) ? "present" : "empty";
  console.log(
    `- [${cert.id}] ${cert.title} | image: ${imageExists ? "EXISTS" : "MISSING"} (${cert.image || "none"}) | url: ${urlStatus}`
  );
}

console.log("\n=== Projects ===");
for (const project of projectsData) {
  const mainExists = fileExistsInPublic(project.image);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const gallerySummary = gallery
    .map((src) => `${src}:${fileExistsInPublic(src) ? "EXISTS" : "MISSING"}`)
    .join(", ");
  const codeStatus = hasNonEmptyString(project.code) ? "present" : "empty";
  console.log(
    `- [#${project.id}] ${project.name} | image: ${mainExists ? "EXISTS" : "MISSING"} (${project.image || "none"})${gallery.length ? ` | gallery: [${gallerySummary}]` : ""} | code: ${codeStatus}`
  );
}

process.exit(0);
