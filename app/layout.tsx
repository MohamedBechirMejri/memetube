import { Inter } from "next/font/google";
import Layout from "./LayoutClient";
import "./globals.scss";
import { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "MemeStash";
const APP_DEFAULT_TITLE = "MemeStash";
const APP_TITLE_TEMPLATE = "%s - MemeStash";
const APP_DESCRIPTION = "Collection of the best memes around the web";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-[100svh] w-[100svw] flex-col items-center justify-between bg-slate-950 text-white antialiased"
        }
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
