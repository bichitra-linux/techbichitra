import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from 'next';

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechBichitra",
  description: "Everything about Tech",
};

export default function RootLayout({ children, session }: RootLayoutProps & { session: any }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SessionProvider session={session}>
            <ThemeContextProvider>
              <ThemeProvider>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                    <Footer />
                  </div>
                </div>
              </ThemeProvider>
            </ThemeContextProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return { session };
};