#!/usr/bin/env bash
# Exit on error
set -e

# Build the project
npm run build

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy 