import { PrismaClient } from '../../generated/prisma'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function to connect to the database
export async function connectPrisma() {
  try {
    await prisma.$connect()
    console.log('✅ Prisma connected to Supabase database successfully')
  } catch (error) {
    console.error('❌ Prisma connection error:', error)
    throw error
  }
}

// Helper function to disconnect from the database
export async function disconnectPrisma() {
  try {
    await prisma.$disconnect()
    console.log('✅ Prisma disconnected from database')
  } catch (error) {
    console.error('❌ Prisma disconnection error:', error)
    throw error
  }
}

export default prisma