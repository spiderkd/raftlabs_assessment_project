"use client";

import { useState, useMemo } from "react";
import MenuItemCard from "./MenuItemCard";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isFeatured: boolean;
};

export default function MenuTabs({ items }: { items: MenuItem[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((item) => item.category)),
    ) as string[];

    return ["ALL", ...unique];
  }, [items]);

  const [active, setActive] = useState<string>("ALL");

  const filteredItems =
    active === "ALL" ? items : items.filter((item) => item.category === active);

  return (
    <div className="space-y-16">
      {/* ===== Category Tabs ===== */}
      <div className="flex flex-wrap justify-center gap-6 border-b border-white/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-sm tracking-[0.2em] uppercase transition-all duration-300
              ${
                active === cat
                  ? "text-[#c6a96b] border-b border-[#c6a96b] pb-2"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* ===== Dish Count ===== */}
      <div className="text-center text-sm text-gray-500 tracking-wide">
        {filteredItems.length} dishes available
      </div>

      {/* ===== Grid ===== */}
      {filteredItems.length === 0 ? (
        <div className="border border-white/10 rounded-3xl p-12 text-center bg-[#151515] shadow-lg">
          <p className="text-gray-400 text-lg">
            No dishes available in this category.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#151515]
                         border border-white/5
                         rounded-3xl
                         hover:border-[#c6a96b]/50
                         hover:-translate-y-2
                         hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                         transition-all duration-500"
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
