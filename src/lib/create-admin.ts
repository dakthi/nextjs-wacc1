import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function createAdminUser(email: string, password: string, name?: string) {
  const hashedPassword = await bcrypt.hash(password, 12)
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || 'Admin',
        role: 'admin',
        active: true
      }
    })
    
    console.log('Admin user created:', { id: user.id, email: user.email, name: user.name })
    return user
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  }
}

// Script to create default admin user
async function main() {
  // Check if admin user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email: 'admin@westactoncentre.co.uk' }
  })
  
  if (existingUser) {
    console.log('Admin user already exists')
    return
  }
  
  // Create default admin user
  await createAdminUser(
    'admin@westactoncentre.co.uk',
    'admin123', // Change this password in production!
    'WACC Admin'
  )
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}