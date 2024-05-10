import repo from '@/app/repo/repo';

export async function GET(request, {}) {
  const sellers = await repo.getSellers();
  return Response.json(sellers, { status: 200 });
}
