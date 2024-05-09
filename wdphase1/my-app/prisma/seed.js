
import fs from 'fs';

// Function to read data from JSON files
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Main seeding function
async function main() {
  // Read users and items data from JSON files
  const usersData = readJSONFile('/data/users.json');
  const itemsData = readJSONFile('/data/items.json');

  // Destructure users data into respective arrays
  const { customers, sellers, admin } = usersData;

  // Create customers
  for (const customer of customers) {
    await prisma.customer.create({
      data: {
        name: customer.name,
        surname: customer.surname,
        shippingAddress: customer.shipping_address,
        username: customer.username,
        password: customer.password,
        moneyBalance: customer.money_balance,
      },
    });
  }

  // Create sellers
  for (const seller of sellers) {
    await prisma.seller.create({
      data: {
        companyName: seller.company_name,
        username: seller.username,
        password: seller.password,
        bankAccount: seller.bank_account,
      },
    });
  }

  // Create admin
  await prisma.admin.create({
    data: {
      username: admin.username,
      password: admin.password,
    },
  });

  // Create items
  for (const item of itemsData) {
    await prisma.item.create({
      data: {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sellerId: item.sellerId,
        image: item.image,
        description: item.description,
        category: item.category,
      },
    });
  }
}

// Execute main function
main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error('Seeding failed: ', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
