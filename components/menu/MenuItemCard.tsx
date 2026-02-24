"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/ui/Toast";
import { Check } from "lucide-react";

export default function MenuItemCard({ item }: any) {
  const { addOrUpdateItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    addOrUpdateItem(item, qty);

    setAdded(true);
    setShowToast(true);
    setQty(1);

    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div
        className={`group bg-[#151515] rounded-3xl border p-5 flex flex-col transition-all duration-500
        ${
          added
            ? "border-[#c6a96b] ring-2 ring-[#c6a96b]/30"
            : "border-white/5 hover:border-[#c6a96b]/40"
        }
        hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]
        `}
      >
        {/* Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="h-44 w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="mt-5 flex-1">
          <h3 className="text-lg font-light tracking-wide text-white">
            {item.name}
          </h3>

          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-[#c6a96b]">
              ₹{item.price}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={decrease}
                aria-label="decrease quantity"
                className="h-9 w-9 rounded-full border border-white/10
                           text-gray-300 hover:border-[#c6a96b]
                           hover:text-[#c6a96b]
                           transition"
              >
                −
              </button>

              <span className="w-6 text-center text-sm text-gray-300">
                {qty}
              </span>

              <button
                onClick={increase}
                aria-label="increase quantity"
                className="h-9 w-9 rounded-full border border-white/10
                           text-gray-300 hover:border-[#c6a96b]
                           hover:text-[#c6a96b]
                           transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className={`w-full flex items-center justify-center gap-2
              rounded-full py-3 text-sm tracking-wide
              transition-all duration-300
              ${
                added
                  ? "bg-[#c6a96b] text-black shadow-[0_0_30px_rgba(198,169,107,0.4)]"
                  : "border border-[#c6a96b] text-[#c6a96b] hover:bg-[#c6a96b] hover:text-black cursor-pointer"
              }
            `}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          message={`${item.name} added to cart`}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
