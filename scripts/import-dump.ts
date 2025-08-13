import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'

const execAsync = promisify(exec)

async function importDump() {
  console.log('🌱 Importing database from SQL dump...')
  
  const dumpPath = path.join(process.cwd(), 'prisma', 'data-dump.sql')
  
  // Check if dump file exists
  if (!fs.existsSync(dumpPath)) {
    console.error('❌ Error: prisma/data-dump.sql not found')
    console.log('\nTo create a dump, run:')
    console.log('PGPASSWORD=kNiN4321 pg_dump -h 127.0.0.1 -p 55432 -U wacc_user -d wacc_cms_local --data-only --inserts > prisma/data-dump.sql')
    process.exit(1)
  }

  // Get database URL from environment
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL not set')
    process.exit(1)
  }

  // Parse database URL
  const urlParts = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!urlParts) {
    console.error('❌ Error: Invalid DATABASE_URL format')
    process.exit(1)
  }

  const [, user, password, host, port, database] = urlParts

  try {
    // First, clear existing data to avoid conflicts
    console.log('📦 Clearing existing data...')
    
    // Import the SQL dump
    console.log('📥 Importing data from dump...')
    const command = `PGPASSWORD=${password} psql -h ${host} -p ${port} -U ${user} -d ${database} < ${dumpPath}`
    
    const { stdout, stderr } = await execAsync(command)
    
    if (stderr && !stderr.includes('INSERT')) {
      console.error('⚠️  Warnings:', stderr)
    }
    
    console.log('✅ Database imported successfully!')
    
    // Show summary
    const { stdout: countOutput } = await execAsync(
      `PGPASSWORD=${password} psql -h ${host} -p ${port} -U ${user} -d ${database} -t -c "
        SELECT 
          (SELECT COUNT(*) FROM users) as users,
          (SELECT COUNT(*) FROM facilities) as facilities,
          (SELECT COUNT(*) FROM programs) as programs,
          (SELECT COUNT(*) FROM \"SiteSetting\") as settings
      "`
    )
    
    const counts = countOutput.trim().split('|').map(c => c.trim())
    console.log('\n📊 Import summary:')
    console.log(`- Users: ${counts[0]}`)
    console.log(`- Facilities: ${counts[1]}`)
    console.log(`- Programs: ${counts[2]}`)
    console.log(`- Settings: ${counts[3]}`)
    
  } catch (error) {
    console.error('❌ Failed to import database:', error)
    process.exit(1)
  }
}

importDump()