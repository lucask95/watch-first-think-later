import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcryptjs";

const options = {
  providers: [
    Providers.Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const { db } = await connectToDatabase();
        const dbUser = await db
          .collection("users")
          .findOne({ username: username });
        if (!dbUser) return null;
        const parsedDbUser = JSON.parse(JSON.stringify(dbUser));
        const match = bcrypt.compareSync(password, parsedDbUser?.password);
        return match ? parsedDbUser : null;
      },
    }),
  ],
  session: {
    jwt: true,
    // maxAge in seconds
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (user) token.user = user;
      return token;
    },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
