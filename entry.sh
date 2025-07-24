#!/bin/bash
npm install --legacy-peer-deps
npx prisma generate --schema=apps/hotel-management-backend/prisma/schema.prisma
npx nx build hotel-management-backend --configuration=production
node dist/apps/hotel-management-backend/main.js
