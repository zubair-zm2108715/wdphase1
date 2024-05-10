import repo from '@/app/repo/repo';

export async function POST(request) {
  const { itemId, customerId, quantity } = await request.json();
  try {
    const transaction = await repo.purchase(itemId, customerId, quantity);
    return Response.json(transaction, { message: 'Purchase successful' });
  } catch (error) {
    Response.statusCode = 500;
    return Response.json({ error: error.message });
  }
}

export async function GET(request) {
  const transactions = await repo.getorders();
  return Response.json(transactions);
}
