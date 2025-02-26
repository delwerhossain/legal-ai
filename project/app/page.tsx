"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/chat');
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">
        Redirecting to chat...
      </div>
    </div>
  );
}