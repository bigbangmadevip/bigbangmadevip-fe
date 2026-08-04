import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import './globals.css';
import { PwaRegister } from '@/components/pwa-register';

export const metadata: Metadata = {
  title: 'BigbangMadeVIP',
  description: 'bigbangmadevip PWA',
  applicationName: 'bigbangmadevip',
  appleWebApp: {
    capable: true,
    title: 'bigbangmadevip',
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
        <div className="app-shell">{children}</div>
        <PwaRegister />
      </body>
    </html>
  );
}
