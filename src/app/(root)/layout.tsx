import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body
            className={`p-0 m-0`}
        >
            <Navbar />
            {children}
            <Footer />
        </body>
    );
}
