const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('📋 All user accounts:')
    console.log('─'.repeat(80))
    
    if (users.length === 0) {
      console.log('No users found in the database.')
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Name: ${user.name || 'N/A'}`)
        console.log(`   Role: ${user.role}`)
        console.log(`   Active: ${user.active ? '✅ Yes' : '❌ No'}`)
        console.log(`   Created: ${user.createdAt.toISOString()}`)
        console.log(`   Updated: ${user.updatedAt.toISOString()}`)
        console.log('─'.repeat(80))
      })
      
      console.log(`\nTotal users: ${users.length}`)
      const activeUsers = users.filter(u => u.active).length
      const adminUsers = users.filter(u => u.role === 'admin').length
      console.log(`Active users: ${activeUsers}`)
      console.log(`Admin users: ${adminUsers}`)
    }
  } catch (error) {
    console.error('❌ Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listAllUsers()