'use client'

import { GoogleSignInButton } from './GoogleSignInButton';
import { LogoNavbar } from '@/components/common/LogoNavbar';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <LogoNavbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-3xl font-semibold text-center">
            Create an account
          </h1>
          
          <div className="space-y-4">
            <GoogleSignInButton />
            
            <p className="text-sm text-gray-600 text-center px-8">
              By clicking "Sign up with Google" I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              , acknowledge{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              , and consent to receive updates, special offers, and promotional emails. I understand that I can opt out at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}