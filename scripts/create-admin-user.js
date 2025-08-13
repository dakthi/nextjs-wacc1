const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const email = 'admin@westactoncentre.co.uk'
    const password = 'Wacc123@'
    const hashedPassword = await bcrypt.hash(password, 12)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('User already exists, updating password...')
      
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          active: true,
          role: 'admin'
        }
      })
      
      console.log('✅ Admin user updated successfully!')
      console.log('Email:', email)
      console.log('Password:', password)
      console.log('Role:', updatedUser.role)
      console.log('Active:', updatedUser.active)
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          name: 'WACC Admin',
          password: hashedPassword,
          role: 'admin',
          active: true
        }
      })

      console.log('✅ Admin user created successfully!')
      console.log('Email:', email)
      console.log('Password:', password)
      console.log('Role:', user.role)
      console.log('Active:', user.active)
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()