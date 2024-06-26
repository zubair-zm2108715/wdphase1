import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class Repo {
  async getSellerOrders(sellerId) {
    try {
      return await prisma.order.findMany({
        where: {
          sellerId: sellerId,
        },
        include: {
          item: true, // Include associated item details
        },
      });
    } catch (error) {
      throw new Error('Error fetching seller orders: ' + error.message);
    }
  }
  async getselleritems(sellerId) {
    try {
      return prisma.item.findMany({
        where: {
          sellerId,
        },
      });
    } catch (error) {
      throw new Error('Error fetching seller orders: ' + error.message);
    }
  }

  async getCustomerOrders(customerId) {
    try {
      return await prisma.order.findMany({
        where: {
          customerId: customerId,
        },
        include: {
          item: true, // Include associated item details
        },
      });
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  async getTopProductsBySales() {
    return await prisma.order.groupBy({
      by: ['itemId'],
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      _sum: {
        quantity: true,
      },
      take: 5,
    });
  }

  async getAverageQuantitySoldPerProduct() {
    return await prisma.order.groupBy({
      by: ['itemId'],
      _avg: {
        quantity: true,
      },
    });
  }

  async getcustomersPerLocation() {
    try {
      return await prisma.order.groupBy({
        by: ['address'],
        _count: true,
      });
    } catch (error) {
      throw new Error(
        'Error fetching customers per location: ' + error.message
      );
    }
  }

  async getAveragePurchaseAmountPercustomer() {
    return await prisma.order.groupBy({
      by: ['customerId'],
      _avg: {
        totalPrice: true,
      },
    });
  }

  async getTotalPurchasesPerSeller() {
    return await prisma.order.groupBy({
      by: ['sellerId'],
      _count: true,
    });
  }


  async login(username, password) {
    try {
      // Check if the user is a customer
      let user = await this.prisma.customer.findUnique({
        where: {
          username,
        },
      });

      // If user is not found or password is incorrect, check if the user is a seller
      if (!user || user.password !== password) {
        user = await this.prisma.seller.findUnique({
          where: {
            username,
          },
        });

        // If user is not found or password is incorrect for seller as well, throw an error
        if (!user || user.password !== password) {
          throw new Error('Invalid username or password');
        }
      }

      return user;
    } catch (error) {
      throw new Error('Error during login: ' + error.message);
    }
  }
  async addItem(name, price, quantity, sellerId, image, description, category) {
    return await prisma.item.create({
      data: {
        name,
        price,
        quantity,
        sellerId,
        image,
        description,
        category,
      },
    });
  }

  async getItems() {
    try {
      return await prisma.item.findMany();
    } catch (error) {
      throw new Error('Error fetching items: ' + error.message);
    }
  }

  async getCustomers() {
    try {
      return await prisma.customer.findMany();
    } catch (error) {
      throw new Error('Error fetching items: ' + error.message);
    }
  }

  async getSellers() {
    try {
      return await prisma.seller.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  async getorders() {
    try {
      return await prisma.order.findMany();
    } catch (error) {
      throw new Error('Error fetching items: ' + error.message);
    }
  }

  async purchase(itemId, customerId, quantity) {
    try {
      // Get item details
      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });
      if (!item) {
        throw new Error('Item not found');
      }

      // Calculate total price
      const totalPrice = item.price * quantity;

      // Check customer's moneyBalance
      const customer = await prisma.customer.findUnique({
        where: {
          id: customerId,
        },
      });
      if (!customer || customer.moneyBalance < totalPrice) {
        throw new Error('Insufficient moneyBalance');
      }
      // Create order
      const order = await prisma.order.create({
        data: {
          itemId,
          sellerId: item.sellerId,
          customerId,
          quantity,
          totalPrice,
          address: customer.shippingAddress,
        },
      });

      // Update item's quantity
      await prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      // Update customer's moneyBalance
      await prisma.customer.update({
        where: {
          id: customerId,
        },
        data: {
          moneyBalance: {
            decrement: totalPrice,
          },
        },
      });

      return order;
    } catch (error) {
      throw new Error('Error during purchase: ' + error.message);
    }
  }

  async getSellerData(id) {
    try {
      const seller = await this.prisma.seller.findUnique({
        where: {
          id,
        },
      });
      if (!seller) {
        throw new Error('Seller not found');
      }
      return seller;
    } catch (error) {
      throw new Error('Error fetching seller data: ' + error.message);
    }
  }

  async getUserData(id) {
    try {
      const user = await this.prisma.customer.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user data: ' + error.message);
    }
  }
}

export default new Repo();
