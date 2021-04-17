import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";

const options = {
  providers: [
    Providers.Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "lucas",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const { db } = await connectToDatabase();
        const dbUser = db.collection("users").findOne({ username: username });
        const parsedDbUser = JSON.parse(JSON.stringify(dbUser));

        const user = {
          username: "TestUser",
          password: "ip123bp4na;sdklfh",
          email: "testuser@test.test",
          isAdmin: "true",
          parsedDbUser,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    // maxAge in seconds => 7 days
    maxAge: 60,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // console.log({ token, user, account, profile, isNewUser });
      if (user) token.user = user;
      return token;
    },
    async session(session, token) {
      // console.log({ session, token });
      session.user = token.user;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
