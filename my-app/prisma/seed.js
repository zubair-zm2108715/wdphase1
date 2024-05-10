import fs from 'fs-extra';
import path from 'path';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const customersPath = path.join(process.cwd(), 'app/data/customers.json');
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json');
const itemsPath = path.join(process.cwd(), 'app/data/items.json');
const adminPath = path.join(process.cwd(), 'app/data/admin.json');

async function seed() {
  try {
    const customers = await fs.readJSON(customersPath);
    const sellers = await fs.readJSON(sellersPath);
    const items = await fs.readJSON(itemsPath);
    const admin = await fs.readJSON(adminPath);

    await prisma.customer.deleteMany();

    // Seed customers
    for (const customer of customers)
      await prisma.customer.create({ data: customer });

    // Seed sellers
    for (const seller of sellers) await prisma.seller.create({ data: seller });

    // Seed items
    for (const item of items) await prisma.item.create({ data: item });

    // Seed admin
    await prisma.admin.create({ data: admin });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Failed to seed:', error);
  }
}

seed();
