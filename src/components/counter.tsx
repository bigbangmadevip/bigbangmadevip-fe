"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/use-app-store";

export function Counter() {
  const { count, increment } = useAppStore();
  return <Button className="mt-6 w-full" onClick={increment}>Zustand 테스트: {count}</Button>;
}
