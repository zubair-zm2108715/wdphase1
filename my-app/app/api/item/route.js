import repo from '@/app/repo/repo';

export async function GET(request, {}) {
  const items = await repo.getItems();
  return Response.json(items, { status: 200 });
}

export async function POST(request) {
    try{
  const { name, price, quantity, sellerId, image, description, category } =
    await request.json();
  const newItem = await repo.addItem(
    name,
    price,
    quantity,
    sellerId,
    image,
    description,
    category
  );

  return Response.json(newItem, { status: 200 });
}
catch (error) {
  Response.statusCode = 500;
  return Response.json({ error: error.message });
}
}