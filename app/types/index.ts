import { User } from "@prisma/client";

// Created because in getCurrentUser.ts, we converted dates to strings, but in Navbar.tsx, the User type is used, which expects createdAt, updatedAt, and emailVerified to be Date objects. This type is used in Navbar.tsx instead of User.
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
