declare global {
    namespace NodeJS {
      interface Global {
        prisma: PrismaClient;
      }
    }
  }