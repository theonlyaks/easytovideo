import NextAuth, { DefaultSession, AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth } from '@/lib/common/firebase' // Adjust the path as needed
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      uid: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    uid: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Firebase',
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) return null;

        try {
          const credential = GoogleAuthProvider.credential(null, credentials.idToken);
          const { user } = await signInWithCredential(auth, credential);
          console.log('Firebase auth user:', user);

          return {
            id: user.uid,
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.uid = user.uid
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.uid = token.uid as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
