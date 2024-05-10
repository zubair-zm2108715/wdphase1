import repo from '@/app/repo/repo';

export async function GET(request, {}) {
  const customers = await repo.getCustomers();
  return Response.json(customers, { status: 200 });
}
