'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const router = useRouter();
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
    } else {
      router.push('/routines/beginnerfriendly');
    }
  }, [router]);
  return null;
}