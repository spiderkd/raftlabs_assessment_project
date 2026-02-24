"use client";

import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CheckoutForm from "@/components/cart/CheckoutForm";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#c6a96b]">
              Your Selection
            </p>

            <h1 className="text-4xl md:text-5xl font-light tracking-tight mt-3">
              Cart Overview
            </h1>

            <p className="text-gray-400 mt-4">
              Review your curated dishes before proceeding to checkout.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm tracking-wide text-gray-400 hover:text-[#c6a96b] transition"
          >
            ← Continue browsing
          </Link>
        </header>

        {/* Empty State */}
        {cart.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-[#151515] p-16 text-center">
            <p className="text-gray-400 text-lg">
              Your cart is currently empty.
            </p>
          </div>
        )}

        {/* Cart Content */}
        {cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items Section */}
            <section className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-[#151515] border border-white/5 p-8">
                <h2 className="text-xl font-light tracking-wide mb-8">
                  Selected Dishes
                </h2>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <aside className="space-y-8">
              <div className="rounded-2xl bg-[#151515] border border-white/5 p-8">
                <h3 className="text-xl font-light tracking-wide mb-8">
                  Order Summary
                </h3>

                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="h-px bg-white/5 my-6" />

                <div className="flex justify-between text-lg font-medium text-[#c6a96b]">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="rounded-2xl bg-[#151515] border border-white/5 p-8">
                <CheckoutForm />
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
