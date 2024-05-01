import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { NextAuthOptions, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const { GOOGLE_ID, GOOGLE_SECRET, GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GOOGLE_ID || !GOOGLE_SECRET || !GITHUB_ID || !GITHUB_SECRET) {
  throw new Error('Environment variables GOOGLE_ID, GOOGLE_SECRET, GITHUB_ID, GITHUB_SECRET must be set');
}

const prismaAdapter = PrismaAdapter(prisma) as any;
prismaAdapter.createUser = async (user: Omit<AdapterUser, "id">) => {
  const savedUser = await prisma.user.create({
    data: user,
  });
  return savedUser;
};
export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter,
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

export const getAuthSession = () => getServerSession( authOptions );