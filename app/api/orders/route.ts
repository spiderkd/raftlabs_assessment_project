import { prisma } from "@/lib/prisma";
import { success, failure } from "@/lib/api-response";
import { getStatusFromTime } from "@/lib/order-status";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, address, phone, items } = body;

    if (!name || !address || !phone || !items) {
      return failure("All fields are required");
    }

    if (!Array.isArray(items) || items.length === 0) {
      return failure("Order must contain at least one item");
    }

    for (const item of items) {
      if (!item.id || !item.name || !item.price || !item.quantity) {
        return failure("Invalid order item structure");
      }

      const qty = Number(item.quantity);
      if (isNaN(qty) || qty <= 0) {
        return failure("Invalid quantity");
      }
    }

    const order = await prisma.order.create({
      data: {
        name,
        address,
        phone,
        items,
      },
    });

    return success(order, 201);
  } catch {
    return failure("Failed to create order", 500);
  }
}

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return failure("Invalid id");

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) return failure("Order not found", 404);

    return success({
      ...order,
      status: getStatusFromTime(order.createdAt),
    });
  } catch {
    return failure("Failed to fetch order", 500);
  }
}
