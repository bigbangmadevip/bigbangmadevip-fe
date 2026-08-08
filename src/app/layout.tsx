import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import './globals.css';
import { PwaRegister } from '@/components/pwa-register';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'BIGBANG MADE VIP',
  description: 'BIGBANG MADE VIP PWA',
  applicationName: 'BIGBANG MADE VIP',
  appleWebApp: {
    capable: true,
    title: 'BIGBANG MADE VIP',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
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
