import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials; 

        try {
          await connectMongo();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch(error) {
          console.log("Error", error);
          return;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,         // Explicitly type as "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }