import repo from "@/app/repo/repo";

export async function GET(request,{ }){
    const items = await repo.getItems();
    return Response.json(items, {status: 200});
}

export async function POST(request){
    const body = await request.json();
    const item = await repo.addItem(body);
    return Response.json(item, {status: 200});
}