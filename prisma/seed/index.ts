import { PrismaClient } from "@prisma/client";

import { seedImages } from "./images";
import { seedCats } from "./cats";

const prisma = new PrismaClient();

async function main() {
  console.group();
  console.log(`🚀 Start seeding 🚀`);

  console.log(`✅ seeding to images ...`);
  await prisma.image.createMany({
    data: seedImages,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to cats ...`);
  await prisma.cat.createMany({
    data: seedCats,
    skipDuplicates: true,
  });

  console.log(`🚀 Seeding finished 🚀`);
  console.groupEnd();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
