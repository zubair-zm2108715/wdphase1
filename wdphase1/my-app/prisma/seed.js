const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Customers
  await prisma.customer.createMany({
    data: [
      {
        name: 'Alice',
        surname: 'Smith',
        shippingAddress: '456 Oak St, Townsville',
        username: 'alice123',
        password: 'pass123',
        moneyBalance: 1500,
      },
      {
        name: 'Bob',
        surname: 'Johnson',
        shippingAddress: '789 Pine St, Cityville',
        username: 'bob456',
        password: 'pass456',
        moneyBalance: 2000,
      },
      {
        name: 'Charlie',
        surname: 'Brown',
        shippingAddress: '321 Elm St, Villagetown',
        username: 'charlie789',
        password: 'pass789',
        moneyBalance: 1800,
      },
      {
        name: 'David',
        surname: 'Lee',
        shippingAddress: '654 Birch St, Hamletville',
        username: 'david101',
        password: 'pass101',
        moneyBalance: 2200,
      },
      {
        name: 'Eve',
        surname: 'Davis',
        shippingAddress: '987 Maple St, Suburbia',
        username: 'eve202',
        password: 'pass202',
        moneyBalance: 1900,
      },
      {
        name: 'Frank',
        surname: 'Wilson',
        shippingAddress: '123 Cedar St, Riverside',
        username: 'frank303',
        password: 'pass303',
        moneyBalance: 1600,
      },
      {
        name: 'Grace',
        surname: 'Anderson',
        shippingAddress: '456 Oak St, Hillside',
        username: 'grace404',
        password: 'pass404',
        moneyBalance: 2300,
      },
      {
        name: 'Harry',
        surname: 'Martinez',
        shippingAddress: '789 Pine St, Lakeside',
        username: 'harry505',
        password: 'pass505',
        moneyBalance: 2100,
      },
      {
        name: 'Ivy',
        surname: 'Garcia',
        shippingAddress: '321 Elm St, Mountainview',
        username: 'ivy606',
        password: 'pass606',
        moneyBalance: 1750,
      },
      {
        name: 'Jack',
        surname: 'Hernandez',
        shippingAddress: '654 Birch St, Seaside',
        username: 'jack707',
        password: 'pass707',
        moneyBalance: 1950,
      },
      {
        name: 'J',
        surname: 'j',
        shippingAddress: '987 Maple St, Harborview',
        username: 'j',
        password: 'j',
        moneyBalance: 19000,
      },
    ],
  });

  // Seed Sellers
  await prisma.seller.createMany({
    data: [
      {
        companyName: 'ElectroMart',
        username: 'techstore',
        password: 'sellpass1',
        bankAccount: '111122223333',
      },
      {
        companyName: 'TechStore',
        username: 'techshop',
        password: 'sellpass2',
        bankAccount: '444455556666',
      },
      {
        companyName: 'Fragrance Store',
        username: 'fragrancestore',
        password: 'sellpass3',
        bankAccount: '777788889999',
      },
      {
        companyName: 'Sephora',
        username: 'sephora',
        password: 'sellpass4',
        bankAccount: '101010101010',
      },
    ],
  });

  // Seed Admin
  await prisma.admin.create({
    data: { username: 'admin', password: 'adminpass' },
  });

  // Seed Items
  await prisma.item.createMany({
    data: [
      {
        name: 'Apple iPhone 9',
        price: 549,
        quantity: 94,
        sellerId: 1,
        image: 'https://cdn.dummyjson.com/product-images/1/1.jpg',
        description: 'An apple mobile which is nothing like apple',
        category: 'smartphones',
      },
      {
        name: 'Apple iPhone X',
        price: 899,
        quantity: 34,
        sellerId: 1,
        image: 'https://cdn.dummyjson.com/product-images/2/1.jpg',
        description:
          'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        category: 'smartphones',
      },
      {
        name: 'Samsung Universe 9',
        price: 1249,
        quantity: 36,
        sellerId: 1,
        image: 'https://cdn.dummyjson.com/product-images/3/1.jpg',
        description:
          "Samsung's new variant which goes beyond Galaxy to the Universe",
        category: 'smartphones',
      },
      {
        name: 'OPPOF19',
        price: 280,
        quantity: 123,
        sellerId: 1,
        image: 'https://cdn.dummyjson.com/product-images/4/1.jpg',
        description: 'OPPO F19 is officially announced on April 2021.',
        category: 'smartphones',
      },
      {
        name: 'Huawei P30',
        price: 499,
        quantity: 32,
        sellerId: 1,
        image: 'https://cdn.dummyjson.com/product-images/5/1.jpg',
        description:
          'Huawei re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
        category: 'smartphones',
      },
      {
        name: 'MacBook Pro',
        price: 1749,
        quantity: 83,
        sellerId: 2,
        image: 'https://cdn.dummyjson.com/product-images/6/1.png',
        description:
          'MacBook Pro 2021 with mini-LED display may launch between September, November',
        category: 'laptops',
      },
      {
        name: 'Samsung Galaxy Book',
        price: 1499,
        quantity: 50,
        sellerId: 2,
        image: 'https://cdn.dummyjson.com/product-images/7/1.jpg',
        description:
          'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
        category: 'laptops',
      },
      {
        name: 'Microsoft Surface Laptop 4',
        price: 1499,
        quantity: 68,
        sellerId: 2,
        image: 'https://cdn.dummyjson.com/product-images/8/1.jpg',
        description:
          'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
        category: 'laptops',
      },
      {
        name: 'Infinix INBOOK',
        price: 1099,
        quantity: 96,
        sellerId: 2,
        image: 'https://cdn.dummyjson.com/product-images/9/1.jpg',
        description:
          'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
        category: 'laptops',
      },
      {
        name: 'HP Pavilion 15-DK1056WM',
        price: 1099,
        quantity: 89,
        sellerId: 2,
        image: 'https://cdn.dummyjson.com/product-images/10/1.jpg',
        description:
          'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
        category: 'laptops',
      },
      {
        name: 'perfume Oil',
        price: 13,
        quantity: 65,
        sellerId: 3,
        image: 'https://cdn.dummyjson.com/product-images/11/1.jpg',
        description:
          'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',
        category: 'fragrances',
      },
      {
        name: 'Brown Perfume',
        price: 40,
        quantity: 52,
        sellerId: 3,
        image: 'https://cdn.dummyjson.com/product-images/12/1.jpg',
        description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml',
        category: 'fragrances',
      },
      {
        name: 'Fog Scent Xpressio Perfume',
        price: 13,
        quantity: 61,
        sellerId: 3,
        image: 'https://cdn.dummyjson.com/product-images/13/1.jpg',
        description:
          'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men',
        category: 'fragrances',
      },
      {
        name: 'Non-Alcoholic Concentrated Perfume Oil',
        price: 120,
        quantity: 114,
        sellerId: 3,
        image: 'https://cdn.dummyjson.com/product-images/14/1.jpg',
        description:
          'Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil',
        category: 'fragrances',
      },
      {
        name: 'Eau De Perfume Spray',
        price: 30,
        quantity: 105,
        sellerId: 3,
        image: 'https://cdn.dummyjson.com/product-images/15/1.jpg',
        description:
          'Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality',
        category: 'fragrances',
      },
      {
        name: 'Hyaluronic Acid Serum',
        price: 19,
        quantity: 110,
        sellerId: 4,
        image: 'https://cdn.dummyjson.com/product-images/16/1.png',
        description:
          "L'Oréal Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
        category: 'skincare',
      },
      {
        name: 'Tree Oil 30ml',
        price: 12,
        quantity: 78,
        sellerId: 4,
        image: 'https://cdn.dummyjson.com/product-images/17/1.jpg',
        description:
          'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,',
        category: 'skincare',
      },
      {
        name: 'Oil Free Moisturizer 100ml',
        price: 40,
        quantity: 88,
        sellerId: 4,
        image: 'https://cdn.dummyjson.com/product-images/18/1.jpg',
        description:
          'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.',
        category: 'skincare',
      },
      {
        name: 'Skin Beauty Serum.',
        price: 46,
        quantity: 54,
        sellerId: 4,
        image: 'https://cdn.dummyjson.com/product-images/19/1.jpg',
        description:
          'Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m',
        category: 'skincare',
      },
      {
        name: 'Freckle Treatment Cream- 15gm',
        price: 70,
        quantity: 140,
        sellerId: 4,
        image: 'https://cdn.dummyjson.com/product-images/20/1.jpg',
        description:
          "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
        category: 'skincare',
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
