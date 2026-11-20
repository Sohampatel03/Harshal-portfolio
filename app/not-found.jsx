import Link from "next/link";

export default function NotFound() {
  return <div className="not-found"><p className="eyebrow code-eyebrow">{"// ROUTE NOT FOUND"}</p><h1>404</h1><p>This page isn&apos;t part of the portfolio.</p><Link className="button button-primary" href="/">Return home <span>↗</span></Link></div>;
}
