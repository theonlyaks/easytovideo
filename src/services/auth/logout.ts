import { signOut } from 'next-auth/react';

export const handleLogout = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: '/signin' });
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};