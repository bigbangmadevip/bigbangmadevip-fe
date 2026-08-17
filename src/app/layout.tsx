import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import './globals.css';
import { PwaRegister } from '@/components/pwa-register';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'BIGBANG MADE VIP',
  description: 'BIGBANG MADE VIP PWA',
  applicationName: 'BIGBANG MADE VIP',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'BIGBANG MADE VIP',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body>
        <QueryProvider>
          <div className="app-shell">{children}</div>
        </QueryProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
