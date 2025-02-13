import { signOut } from 'next-auth/react';

export const handleLogout = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: '/auth' });
    return true;
  } catch (error) {
    //console.error('Error during logout:', error);
    return false;
  }
};