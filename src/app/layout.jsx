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
  title: "IPray Daily - Your Daily Bible & Prayer Companion",
  description: "Empowering daily prayers with scriptures and resources.",
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
