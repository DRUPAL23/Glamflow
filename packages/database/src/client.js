const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;
const prisma = globalForPrisma.glamflowPrisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.glamflowPrisma = prisma;

module.exports = prisma;
