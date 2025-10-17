// Database connection using Prisma
import { prisma, connectPrisma, disconnectPrisma } from './prisma';

// Main database connection function
async function connectDB() {
  try {
    await connectPrisma();
    return prisma;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.log('💡 Make sure your DATABASE_URL is set in .env.local');
    throw error;
  }
}

// Export Prisma client and connection functions
export { prisma, connectPrisma, disconnectPrisma };
export default connectDB;
