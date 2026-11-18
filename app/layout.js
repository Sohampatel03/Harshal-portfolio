import Footer from "./components/footer";
import Navbar from "./components/navbar";
import RevealManager from "./components/helper/reveal-manager";
import "./css/card.scss";
import "./css/globals.scss";


export const metadata = {
  title: "Harshal Gunjal | Data & Business Analyst",
  description: "Data & Business Analyst with 2 years of professional experience at Onclusive. Specializing in SQL, Python, Power BI, predictive analytics and workflow automation.",
  openGraph: {
    title: "Harshal Gunjal | Data & Business Analyst",
    description: "Turning complex data into meaningful business decisions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><main className="site-shell"><Navbar /><RevealManager />{children}</main><Footer /></body></html>;
}
