import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Food Menu...");

  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  const foodMenu = [
    // 🥂 STARTERS
    {
      name: "Truffle Mushroom Velouté",
      description:
        "Silky wild mushroom soup infused with black truffle oil and micro herbs.",
      price: 595,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
      category: Category.STARTER,
      isFeatured: true,
    },
    {
      name: "Burrata & Heirloom Tomatoes",
      description:
        "Creamy Italian burrata with heirloom tomatoes and aged balsamic pearls.",
      price: 725,
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      category: Category.STARTER,
      isFeatured: false,
    },

    // 🥩 MAIN COURSE
    {
      name: "Wagyu Tenderloin Steak",
      description:
        "Premium A5 Wagyu with roasted baby potatoes and red wine jus.",
      price: 2495,
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
      category: Category.MAIN_COURSE,
      isFeatured: true,
    },
    {
      name: "Herb Crusted Lamb Chops",
      description:
        "Australian lamb crusted with herbs, served with garlic mash.",
      price: 1895,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      category: Category.MAIN_COURSE,
      isFeatured: false,
    },

    // 🐟 SEAFOOD
    {
      name: "Lobster Thermidor",
      description: "Classic French lobster baked in creamy mustard sauce.",
      price: 2895,
      image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b",
      category: Category.SEAFOOD,
      isFeatured: true,
    },

    // 🍝 PASTA
    {
      name: "Truffle Tagliatelle",
      description:
        "Handmade pasta tossed in parmesan cream and shaved black truffle.",
      price: 1250,
      image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8f32",
      category: Category.PASTA,
      isFeatured: false,
    },

    // 🥗 SALAD
    {
      name: "Mediterranean Quinoa Salad",
      description:
        "Organic quinoa with roasted vegetables and citrus vinaigrette.",
      price: 895,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      category: Category.SALAD,
      isFeatured: false,
    },

    // 🍷 BEVERAGE
    {
      name: "Signature Cold Brew Tonic",
      description:
        "Slow brewed coffee served over tonic water with citrus zest.",
      price: 495,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      category: Category.BEVERAGE,
      isFeatured: false,
    },

    // 🍰 DESSERT
    {
      name: "Belgian Dark Chocolate Fondant",
      description:
        "Molten chocolate cake with vanilla bean ice cream and gold dust.",
      price: 695,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      category: Category.DESSERT,
      isFeatured: true,
    },
  ];

  await prisma.menuItem.createMany({
    data: foodMenu,
  });

  console.log("✅ Food Menu Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
