#!/bin/bash

# Script to seed database from SQL dump
# Usage: ./prisma/seed-from-dump.sh

echo "🌱 Seeding database from SQL dump..."

# Check if dump file exists
if [ ! -f "prisma/data-dump.sql" ]; then
    echo "❌ Error: prisma/data-dump.sql not found"
    echo "Run this first: PGPASSWORD=kNiN4321 pg_dump -h 127.0.0.1 -p 55432 -U wacc_user -d wacc_cms_local --data-only --inserts > prisma/data-dump.sql"
    exit 1
fi

# Import the dump
echo "📥 Importing data..."
PGPASSWORD=kNiN4321 psql -h 127.0.0.1 -p 55432 -U wacc_user -d wacc_cms_local < prisma/data-dump.sql

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully!"
else
    echo "❌ Failed to import data"
    exit 1
fi