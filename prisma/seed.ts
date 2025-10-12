import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.contact.create({
    data: {
      name: "André",
      email: "andre@email.com",
      phone: "(31) 91234-5678",
    },
  });

  await prisma.contact.create({
    data: {
      name: "Helena",
      email: "helena@email.com.br",
      phone: "(38) 98765-4321",
    },
  });
await prisma.contact.create({
  data: {
    name: "Lucas",
    email: "lucas@email.com",
    phone: "(21) 99876-5432",
  },
});

await prisma.contact.create({
  data: {
    name: "Carla",
    email: "carla@email.com",
    phone: "(11) 91234-5678",
  },
});

await prisma.contact.create({
  data: {
    name: "Mateus",
    email: "mateus@email.com.br",
    phone: "(41) 98765-4321",
  },
});

await prisma.contact.create({
  data: {
    name: "Fernanda",
    email: "fernanda@email.com.br",
    phone: "(51) 99876-1234",
  },
});

await prisma.contact.create({
  data: {
    name: "Rafael",
    email: "rafael@email.com",
    phone: "(61) 91234-8765",
  },
});

await prisma.contact.create({
  data: {
    name: "Juliana",
    email: "juliana@email.com",
    phone: "(71) 98765-4321",
  },
});

await prisma.contact.create({
  data: {
    name: "Gustavo",
    email: "gustavo@email.com",
    phone: "(81) 99876-5432",
  },
});

await prisma.contact.create({
  data: {
    name: "Amanda",
    email: "amanda@email.com.br",
    phone: "(91) 91234-5678",
  },
});

  console.log("Seed concluído");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });