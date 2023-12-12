import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.delete({
    where: {
      email: "ychag@example.com", //se debe pasar un dato unico
    },
  });
  // const user = await prisma.user.create({ data: { name: "Emma Cruz" } });
  // const users = await prisma.user.findMany();

  //console.log(users);
  const user = await prisma.user.create({
    data: {
      name: "Emma Cruz",
      email: "emma@cruz.com",
      age: 30,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // include: {
    //   userPreference: true,
    // },
    select: {
      name: true,
      //userPreference: true,
      userPreference: {
        select: {
          id: true,
        },
      },
    },
  });
  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Emma Cruz",
  //       email: "emma@cruz.com",
  //       age: 30,
  //     },
  //     {
  //       name: "Hugo Cruz",
  //       email: "hugo@cruz.com",
  //       age: 31,
  //     },
  //   ],
  // });
  console.log(user);

  // const users = await prisma.user.findUnique({
  //   where: {
  //     email: "emma@cruz.com",
  //   },
  // });

  // const users = await prisma.user.findUnique({
  //   where: {
  //     age_name: {
  //       age: 30,
  //       name: "Emma Cruz",
  //     },
  //   },
  // });
  // const users = await prisma.user.findFirst({
  //   where: {
  //     name: "Emma Cruz",
  //   },
  // });
  const users = await prisma.user.findMany({
    where: {
      // name: "Emma Cruz",
      email: { startsWith: "Em" },
    },
    take: 2, //pagination
    orderBy: {
      age: "desc",
    },
  });

  // const usersUpdated = await prisma.user.update({
  //   where: {
  //     email: "emma@cruz.com",
  //   },
  //   data: {
  //     email: "emma@cruz2.com",
  //   },
  // });
  const usersUpdated = await prisma.user.updateMany({
    where: {
      name: "Emma",
    },
    data: {
      name: "Sally",
    },
  });
}

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(async () => await prisma.$disconnect());
