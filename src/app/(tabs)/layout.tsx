import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { AuthGate } from '@/components/auth/auth-gate';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGate>
      <div className="min-h-[calc(100dvh-env(safe-area-inset-top))] pb-[calc(64px+env(safe-area-inset-bottom))] px-5">
        {children}
      </div>
      <BottomNavigation />
    </AuthGate>
  );
}
