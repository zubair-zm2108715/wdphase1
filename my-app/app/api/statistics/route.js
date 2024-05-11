import repo from '@/app/repo/repo';

export async function GET(request) {
  try {
    const getAverageQuantitySoldPerProduct =
      await repo.getAverageQuantitySoldPerProduct();
    const topProductsBySales = await repo.getTopProductsBySales();
    const getTopCategoriesBySales = await repo.getTopCategoriesBySales();
    const customersPerLocation = await repo.getcustomersPerLocation();
    const averagePurchaseAmountPerCustomer =
      await repo.getAveragePurchaseAmountPercustomer();
    const totalPurchasesPerSeller = await repo.getTotalPurchasesPerSeller();

    return Response.json({
      getTopCategoriesBySales,
      getAverageQuantitySoldPerProduct,
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
