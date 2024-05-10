import repo from '@/app/repo/repo';

export async function GET(request) {
  try {
    const year = new Date().getFullYear().toString();
    const getAverageQuantitySoldPerProduct =
      await repo.getAverageQuantitySoldPerProduct();
    const totalRevenuePerHour = await repo.getTotalRevenuePerHour(year);
    const topProductsBySales = await repo.getTopProductsBySales();
    const customersPerLocation = await repo.getcustomersPerLocation();
    const averagePurchaseAmountPerCustomer =
      await repo.getAveragePurchaseAmountPercustomer();
    const totalPurchasesPerSeller = await repo.getTotalPurchasesPerSeller();

    return Response.json({
      getAverageQuantitySoldPerProduct,
      totalRevenuePerHour,
      topProductsBySales,
      customersPerLocation,
      averagePurchaseAmountPerCustomer,
      totalPurchasesPerSeller,
    }, { status: 200 });
  } catch (error) {
    Response.statusCode = 500;
    return Response.json({
      error: 'Error fetching statistics',
      message: error.message,
    });
  }
}
