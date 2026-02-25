import { prisma } from "@/lib/prisma";
import { success, failure } from "@/lib/api-response";
import { getStatusFromTime } from "@/lib/order-status";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    const computed = orders.map((order) => ({
      ...order,
      status: getStatusFromTime(order.createdAt),
    }));

    return success(computed);
  } catch {
    return failure("Failed to fetch orders", 500);
  }
}
