// Test script to verify Supabase database connection
const { PrismaClient } = require('./generated/prisma');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    // Test course progress query
    const progressCount = await prisma.courseProgress.count();
    console.log(`📈 Total course progress records: ${progressCount}`);
    
    console.log('🎉 All tests passed! Your Supabase database is ready.');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n💡 Make sure you have:');
    console.log('1. Created a .env.local file with your DATABASE_URL');
    console.log('2. Run "npx prisma db push" to create the schema');
    console.log('3. Your Supabase project is active');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
