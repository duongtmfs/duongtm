import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({ src: "./fonts/anton.woff2", variable: "--anton" });
const geist = localFont({ src: "./fonts/geist.woff2", variable: "--geist" });
const mono = localFont({ src: "./fonts/geist-mono.woff2", variable: "--mono" });
const brush = localFont({
  src: "./fonts/caveat-brush.woff2",
  variable: "--brush",
});

export const metadata: Metadata = {
  title: "Tong Minh Duong — Frontend Developer",
  description:
    "Selected frontend work in enterprise software, web migration, and cybersecurity by Tong Minh Duong.",
};

const boot = `(() => {
  const root = document.documentElement;
  const override = new URLSearchParams(location.search).get('agents');
  let saved;
  try { saved = localStorage.getItem('portfolio-agents'); } catch {}
  const enabled = override === 'on' || (override !== 'off' && saved !== 'off' && !matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (enabled) {
    root.classList.add('build-mode', 'booting');
    setTimeout(() => { if (!root.hasAttribute('data-engine')) root.classList.remove('build-mode', 'booting'); }, 6000);
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        anton.variable,
        geist.variable,
        mono.variable,
        brush.variable,
      ].join(" ")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <noscript><style>{".dock,.menu-btn{display:none!important}"}</style></noscript>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
