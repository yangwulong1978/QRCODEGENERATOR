import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Uniware QR Code Generator',
  description: 'Generate QR codes for company information with CompanyName, TemporaryToken, and Base API URL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
