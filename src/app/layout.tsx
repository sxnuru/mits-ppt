import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "MITS — Multiple Identification and Tracking System",
  description: "Advanced Vehicle & Personnel Intelligence (AVPI). An advanced AI-powered surveillance and recognition platform designed for high-accuracy ALPR, facial intelligence, and real-time security monitoring.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;700;800&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
