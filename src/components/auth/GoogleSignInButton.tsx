// components/auth/GoogleSignInButton.tsx
'use client'

import { useState } from 'react';
import { handleGoogleLogin } from '@/services/auth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onGoogleLogin = async () => {
    // const success = await handleGoogleLogin(setLoading);
    // if (success) {
    //   router.push('/app');
    // }
  };

  return (
    <button
      onClick={onGoogleLogin}
      className="w-full bg-white text-gray-600 border border-gray-300 font-medium px-6 py-2.5 rounded-md text-base flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors">
      <Image 
        src="/google.svg"
        alt="Google logo"
        width={18}
        height={18}
        className="mr-3"
      />
      {loading ? 'Signing In...' : 'Sign in with Google'}
    </button>
  );
}