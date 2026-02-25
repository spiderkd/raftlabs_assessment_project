
import { prisma } from "@/lib/prisma";
import { success, failure } from "@/lib/api-response";
import { Category } from "@prisma/client";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!id) return failure("Menu item id is required");

    const body = await req.json();
    const updateData: any = {};

    if (body.name) updateData.name = body.name;
    if (body.description) updateData.description = body.description;
    if (body.image) updateData.image = body.image;

    if (body.price) {
      const numericPrice = Number(body.price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return failure("Invalid price");
      }
      updateData.price = numericPrice;
    }

    if (body.category) {
      if (!Object.values(Category).includes(body.category)) {
        return failure("Invalid category value");
      }
      updateData.category = body.category;
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: updateData,
    });

    return success(updated);
  } catch {
    return failure("Menu item not found", 404);
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    if (!id) return failure("Menu item id is required");

    await prisma.menuItem.delete({
      where: { id },
    });

    return success({ success: true });
  } catch {
    return failure("Menu item not found", 404);
  }
}
