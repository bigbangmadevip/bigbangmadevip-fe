import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { AuthGate } from '@/components/auth/auth-gate';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGate>
      <div className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(146px+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <BottomNavigation />
    </AuthGate>
  );
}
