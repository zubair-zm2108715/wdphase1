const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Customer functions
async function addCustomer(data) {
  return await prisma.customer.create({ data });
}

async function updateCustomer(id, data) {
  return await prisma.customer.update({
    where: { id },
    data,
  });
}

async function deleteCustomer(id) {
  return await prisma.customer.delete({
    where: { id },
  });
}

// Seller functions
async function addSeller(data) {
  return await prisma.seller.create({ data });
}

async function updateSeller(id, data) {
  return await prisma.seller.update({
    where: { id },
    data,
  });
}

async function deleteSeller(id) {
  return await prisma.seller.delete({
    where: { id },
  });
}

// Admin functions
async function addAdmin(data) {
  return await prisma.admin.create({ data });
}

async function updateAdmin(id, data) {
  return await prisma.admin.update({
    where: { id },
    data,
  });
}

async function deleteAdmin(id) {
  return await prisma.admin.delete({
    where: { id },
  });
}

// Item functions
async function addItem(data) {
  return await prisma.item.create({ data });
}

async function updateItem(id, data) {
  return await prisma.item.update({
    where: { id },
    data,
  });
}

async function deleteItem(id) {
  return await prisma.item.delete({
    where: { id },
  });
}

module.exports = {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addSeller,
  updateSeller,
  deleteSeller,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  addItem,
  updateItem,
  deleteItem,
};
