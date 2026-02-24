"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders/all")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute -top-50 -left-50 w-125 h-125 bg-[#c6a96b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* ================= HEADER ================= */}
        <header className="space-y-6">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c6a96b]">
            History
          </p>

          <h1 className="text-5xl font-light tracking-tight">Your Orders</h1>

          <p className="text-gray-400 max-w-md">
            Track and review your curated dining experiences.
          </p>
        </header>

        {/* ================= EMPTY STATE ================= */}
        {orders.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-20 text-center">
            <h2 className="text-xl font-light mb-4">No orders yet</h2>
            <p className="text-gray-400 mb-8">
              Once you place an order, it will appear here.
            </p>

            <Link
              href="/"
              className="inline-block px-8 py-3 border border-[#c6a96b] text-[#c6a96b]
                         hover:bg-[#c6a96b] hover:text-black transition"
            >
              Explore Menu
            </Link>
          </div>
        )}

        {/* ================= ORDER LIST ================= */}
        <div className="space-y-10">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum: number, i: any) => sum + i.price * i.quantity,
              0,
            );

            const delivered = order.status === "Delivered";

            return (
              <section
                key={order.id}
                className="rounded-2xl bg-[#141414]
                           border border-white/5
                           p-10 space-y-10
                           transition hover:border-[#c6a96b]/40"
              >
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-sm tracking-widest text-[#c6a96b]">
                      ORDER #{order.id.slice(-6)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`text-xs tracking-widest uppercase px-4 py-1 border
                      ${
                        delivered
                          ? "border-[#c6a96b] text-[#c6a96b]"
                          : "border-gray-600 text-gray-400"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="border border-white/5 rounded-xl p-6 text-sm text-gray-400 space-y-1">
                  <p className="text-white font-light">{order.name}</p>
                  <p>{order.phone}</p>
                  <p className="text-xs text-gray-500">{order.address}</p>
                </div>

                {/* Items */}
                <div className="space-y-6">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-sm font-light text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-[#c6a96b]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-white/5 pt-8">
                  <p className="text-lg font-medium text-[#c6a96b]">
                    Total ₹{total}
                  </p>

                  <Link
                    href={`/order/${order.id}`}
                    className="px-8 py-3 text-sm tracking-widest uppercase
                               border border-[#c6a96b] text-[#c6a96b]
                               hover:bg-[#c6a96b] hover:text-black
                               transition"
                  >
                    Track Order
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
