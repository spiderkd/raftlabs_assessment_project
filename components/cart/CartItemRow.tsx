"use client";

import { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <div
      className="group flex items-center justify-between
                    bg-[#121212]
                    border border-white/5
                    rounded-2xl
                    p-5
                    transition-all duration-300
                    hover:border-[#c6a96b]/40
                    hover:bg-[#161616]"
    >
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2">
          <p className="text-base font-light tracking-wide text-white">
            {item.name}
          </p>

          <p className="text-sm text-gray-400">
            ₹{item.price} × {item.quantity}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        <span className="text-lg font-medium text-[#c6a96b]">₹{lineTotal}</span>

        <button
          onClick={() => removeItem(item.id)}
          className="text-xs tracking-wider uppercase
                     text-gray-500
                     hover:text-red-500
                     transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
