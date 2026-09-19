import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://championbullies.vercel.app"),
  title: {
    default: "Champion Bullies — AKC English & French Bulldog Breeder in Florida",
    template: "%s | Champion Bullies",
  },
  // Was describing Pocket Bullies in South Carolina, which is not this
  // breeder and not this state. Matches the page's own copy now.
  description:
    "AKC registered English and French Bulldogs from champion bloodlines, raised inside our Florida home. Two to three planned litters a year — reserve a puppy or ask us anything.",
  openGraph: {
    type: "website",
    siteName: "Champion Bullies",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Champion Bullies",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
