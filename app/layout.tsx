import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A visual proof desk for one idea at a time: three synthetic problems, each revealed one move at a time.";

export const metadata: Metadata = {
  metadataBase: new URL("https://math.bookchaowalit.com"),
  title: "Math Workshop — Proof desk",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Math Workshop", title: "Math Workshop — Proof desk", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
