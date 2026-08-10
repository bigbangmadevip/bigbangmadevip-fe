import { AuthGate } from '@/components/auth/auth-gate';

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGate>
      <div className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(40px+env(safe-area-inset-bottom))]">
        {children}
      </div>
    </AuthGate>
  );
}
