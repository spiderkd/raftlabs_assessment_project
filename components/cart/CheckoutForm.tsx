"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.phone) {
      toast.error("All fields are required.");
      return;
    }

    if (!validatePhone(form.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      ``;
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        items: cart,
      }),
    });

    const order = await res.json();

    clearCart();
    router.push(`/order/${order.id}`);
  };

  return (
    <div className="rounded-2xl bg-[#121212] border border-white/5 p-8 space-y-8">
      <div>
        <p className="text-sm tracking-[0.3em] uppercase text-[#c6a96b]">
          Delivery
        </p>

        <h3 className="text-xl font-light tracking-wide mt-3">
          Guest Information
        </h3>
      </div>

      <div className="space-y-5">
        <input
          placeholder="Full name"
          className="w-full bg-transparent border-b border-white/10
                     py-3 text-white placeholder-gray-500
                     focus:outline-none focus:border-[#c6a96b]
                     transition"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Delivery address"
          className="w-full bg-transparent border-b border-white/10
                     py-3 text-white placeholder-gray-500
                     focus:outline-none focus:border-[#c6a96b]
                     transition"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Phone number"
          className="w-full bg-transparent border-b border-white/10
                     py-3 text-white placeholder-gray-500
                     focus:outline-none focus:border-[#c6a96b]
                     transition"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, ""), // allow only digits
            })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 text-sm tracking-widest uppercase
                   border border-[#c6a96b]
                   text-[#c6a96b]
                   hover:bg-[#c6a96b]
                   hover:text-black
                   transition-all duration-300 cursor-pointer"
      >
        Place Order
      </button>

      <p className="text-xs text-gray-500 text-center">
        You will be redirected to live order tracking.
      </p>
    </div>
  );
}
