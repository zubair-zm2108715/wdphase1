import repo from '@/app/repo/repo';

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  const items = await repo.getselleritems(id);
  return Response.json(items);
}
