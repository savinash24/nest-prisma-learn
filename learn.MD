npm install prisma 
npx prisma init  // This will create a prisma directory with a schema.prisma file.
npx prisma generate // This will generate a Prisma Client in the node_modules/.prisma/client directory.
npx prisma migrate dev --create-only // This will create a migration file without any changes to database
npx prisma migrate dev // This will create a migration file and apply the changes to your database.

nest g s common/prisma 

creating a module,controller and service for user
nest g mo user
nest g co user
nest g s user

