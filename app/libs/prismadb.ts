import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// NextJS 13 can cause issues with PrismaClient being instantiated multiple times
// The PrismaClient is assigned to a globalThis variable, which is not affected by the hot reloading
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
