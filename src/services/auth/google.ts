import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { auth } from '@/lib/common/firebase';

const provider = new GoogleAuthProvider();

export async function handleGoogleLogin(setLoading: (loading: boolean) => void) {

  setLoading(true);

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const nextAuthResult = await signIn('credentials', {
      idToken: accessToken,
      redirect: false,
    });

    if (nextAuthResult?.error) {
      console.error('NextAuth error:', nextAuthResult.error);
      return false;
    }
    return true;
  } catch (error) {

    console.error('Error during sign in:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/popup-closed-by-user') {
      console.log('Sign-in popup was closed by the user');
    }

    return false;

  } finally {
    setLoading(false);
  }
}