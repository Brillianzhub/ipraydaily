import localFont from "next/font/local";
import { BibleDataProvider } from '../context/BibleDataContext';
import "./globals.css";

// Load fonts with variable usage
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for SEO and consistent Head elements
export const metadata = {
  title: "Bible Verses | Daily Prayer | Divine Word",
  description: "Discover inspiring Bible verses. Search, read, and meditate on God's Word. Find comfort, hope, and guidance through Scripture.",
  keywords: "Bible verses, Scripture, God's Word, Bible study, Christian, spiritual, devotion, prayer, IPray Daily, Koinonia Global Messages",
  icons: {
    icon: "/images/ipray_ico.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BibleDataProvider>
          {children}
        </BibleDataProvider>
      </body>
    </html>
  );
}
