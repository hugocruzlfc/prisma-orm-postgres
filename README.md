## Prisma workflow

```bash
# Install dependencies
npm i --save-dev prisma typescript nodemon ts-node @types/node
npm i @prisma/client

# Run prisma
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```
