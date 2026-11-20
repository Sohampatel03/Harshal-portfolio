import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import RevealManager from "./components/helper/reveal-manager";
import ScrollProgress from "./components/helper/scroll-progress";
import ScrollToTop from "./components/helper/scroll-to-top";
import PointerEffects from "./components/helper/pointer-effects";
import { personalData } from "@/utils/data/personal-data";
import "./css/globals.scss";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const deploymentUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const metadataBase = new URL(deploymentUrl);

export const metadata = {
  metadataBase,
  title: `${personalData.name} | ${personalData.designation}`,
  description: personalData.description,
  applicationName: `${personalData.name} Portfolio`,
  openGraph: {
    title: `${personalData.name} | ${personalData.designation}`,
    description: personalData.description,
    type: "website",
    siteName: `${personalData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.name} | ${personalData.designation}`,
    description: personalData.description,
  },
};

export const viewport = { themeColor: "#070f1c", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <a className="skip-link" href="#home">Skip to content</a>
        <PointerEffects />
        <ScrollProgress />
        <Navbar />
        <main className="site-shell">
          <RevealManager />
          {children}
        </main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
