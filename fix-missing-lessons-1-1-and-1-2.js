const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function fixMissingLessons1_1And1_2() {
  try {
    console.log('🔧 Fixing missing lessons 1-1 and 1-2...');
    
    // Get all users with reformers course progress
    const users = await prisma.user.findMany({
      include: {
        courseProgress: {
          where: {
            courseId: 'level1-reformers'
          },
          include: {
            completedLessons: true
          }
        }
      }
    });

    if (users.length === 0) {
      console.log('❌ No users found with reformers progress');
      return;
    }

    for (const user of users) {
      console.log(`\n👤 User: ${user.name} (${user.email})`);
      
      const reformersProgress = user.courseProgress.find(cp => cp.courseId === 'level1-reformers');
      if (!reformersProgress) {
        console.log('   ❌ No reformers progress found');
        continue;
      }

      console.log(`   📚 Course Progress ID: ${reformersProgress.id}`);
      console.log(`   📊 Current Progress: ${reformersProgress.progress}%`);
      console.log(`   📋 Completed Lessons: ${reformersProgress.completedLessons.length}`);

      // Check if 1-1 and 1-2 are already completed
      const existing1_1 = reformersProgress.completedLessons.find(l => l.lessonId === '1-1');
      const existing1_2 = reformersProgress.completedLessons.find(l => l.lessonId === '1-2');
      
      if (existing1_1 && existing1_2) {
        console.log('   ✅ Lessons 1-1 and 1-2 are already completed');
        continue;
      }

      const baseTime = new Date();
      baseTime.setHours(baseTime.getHours() - 24); // Set to 24 hours ago as base

      // Add lesson 1-1 if missing
      if (!existing1_1) {
        console.log('   ➕ Adding missing lesson 1-1...');
        await prisma.completedLesson.create({
          data: {
            progressId: reformersProgress.id,
            lessonId: '1-1',
            lessonName: 'The Anatomy of the Xformer',
            completedAt: new Date(baseTime.getTime() + 1000) // 1 second after base
          }
        });
        console.log('   ✅ Lesson 1-1 added successfully');
      }

      // Add lesson 1-2 if missing
      if (!existing1_2) {
        console.log('   ➕ Adding missing lesson 1-2...');
        await prisma.completedLesson.create({
          data: {
            progressId: reformersProgress.id,
            lessonId: '1-2',
            lessonName: 'Move Slow: High intensity and Low Impact',
            completedAt: new Date(baseTime.getTime() + 2000) // 2 seconds after base
          }
        });
        console.log('   ✅ Lesson 1-2 added successfully');
      }

      // Recalculate progress
      const totalLessons = 149; // Total lessons in Level 1 Reformers
      const newCompletedCount = reformersProgress.completedLessons.length + 
        (!existing1_1 ? 1 : 0) + (!existing1_2 ? 1 : 0);
      const newProgress = Math.round((newCompletedCount / totalLessons) * 100);

      // Update course progress
      await prisma.courseProgress.update({
        where: { id: reformersProgress.id },
        data: {
          progress: newProgress,
          lastAccessed: new Date()
        }
      });

      console.log(`   📊 Updated progress: ${newProgress}% (${newCompletedCount}/${totalLessons} lessons)`);

      // Check Chapter 1 lessons
      const chapter1Lessons = reformersProgress.completedLessons
        .filter(l => l.lessonId.startsWith('1-'))
        .map(l => l.lessonId);
      
      // Add 1-1 and 1-2 to the list if they were missing
      if (!existing1_1) chapter1Lessons.push('1-1');
      if (!existing1_2) chapter1Lessons.push('1-2');
      
      console.log(`   📋 Chapter 1 lessons: [${chapter1Lessons.sort().join(', ')}]`);
      console.log(`   📝 Chapter 1: ${chapter1Lessons.length} lessons completed`);
    }
    
    console.log('\n🎉 Lessons 1-1 and 1-2 fix completed!');
    console.log('💡 Now refresh your course page to see the changes');
    
  } catch (error) {
    console.error('❌ Error fixing lessons 1-1 and 1-2:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixMissingLessons1_1And1_2();
