
import { prisma } from "@/lib/prisma";
import { success, failure } from "@/lib/api-response";
import { Category } from "@prisma/client";

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: "desc" },
    });

    return success(items);
  } catch {
    return failure("Failed to fetch menu items", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, image, category } = body;

    if (!name || !description || !price || !image || !category) {
      return failure("All fields including category are required");
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return failure("Invalid price");
    }

    if (!Object.values(Category).includes(category)) {
      return failure("Invalid category value");
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: numericPrice,
        image,
        category,
      },
    });

    return success(item, 201);
  } catch {
    return failure("Failed to create menu item", 500);
  }
}
