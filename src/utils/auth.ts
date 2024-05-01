import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

const { GOOGLE_ID, GOOGLE_SECRET, GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GOOGLE_ID || !GOOGLE_SECRET || !GITHUB_ID || !GITHUB_SECRET) {
  throw new Error('Environment variables GOOGLE_ID, GOOGLE_SECRET, GITHUB_ID, GITHUB_SECRET must be set');
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);