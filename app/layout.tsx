import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { cn } from '@/lib/utils';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const geistSans = Nunito({
  variable: '--font-nunito',
  subsets: ['cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Рикша',
  icons: {
    icon: ' /logo.svg',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={
          (cn(geistSans.variable), 'min-h-screen flex flex-col justify-between')
        }
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
